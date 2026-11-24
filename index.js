require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pino = require('pino');
const {
  default: makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');
const { createDbAuthAdapter } = require('./lib/database');
const { handleCommand, ALL_COMMANDS } = require('./lib/commands');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const BOT_NAME = process.env.BOT_NAME || 'HANS TECHY V2';
const OWNER_NUMBER = process.env.OWNER_NUMBER || '255000000000';

let sock = null;
let isConnected = false;
let uptimeStart = Date.now();
let latestPairingCode = null;

// Bot dynamic runtime config
const botConfig = {
  botName: BOT_NAME,
  prefix: process.env.PREFIX || '.',
  mode: 'PUBLIC',
  ownerNumber: OWNER_NUMBER,
  getUptime: () => {
    const uptimeSeconds = Math.floor((Date.now() - uptimeStart) / 1000);
    const hrs = Math.floor(uptimeSeconds / 3600);
    const mins = Math.floor((uptimeSeconds % 3600) / 60);
    const secs = uptimeSeconds % 60;
    return `${hrs ? hrs + 'h ' : ''}${mins}m ${secs}s`;
  },
  getRam: () => `${(process.memoryUsage().rss / (1024 * 1024)).toFixed(2)} MB`
};

if (!DATABASE_URL) {
  console.error('[FATAL] DATABASE_URL environment variable is missing!');
}

const { useDatabaseAuthState } = createDbAuthAdapter(DATABASE_URL);

async function startBot(requestPairingPhone = null) {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useDatabaseAuthState();

  sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04']
  });

  // Pairing code request if phone is provided and creds not registered
  if (requestPairingPhone && !sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        const cleanedNumber = requestPairingPhone.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(cleanedNumber);
        latestPairingCode = code;
        console.log(`[PAIRING] Pairing code for ${cleanedNumber}: ${code}`);
      } catch (err) {
        console.error('[PAIRING ERROR]', err);
      }
    }, 3000);
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      isConnected = false;
      console.log('[BOT] Connection closed. Reconnecting:', shouldReconnect);
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === 'open') {
      isConnected = true;
      console.log(`[BOT] Connected successfully! ${BOT_NAME} is ONLINE with 385 commands.`);
      uptimeStart = Date.now();
    }
  });

  // Incoming message handling (385 modular commands)
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    try {
      if (type !== 'notify') return;
      const msg = messages[0];
      if (!msg || !msg.message) return;

      const from = msg.key.remoteJid;
      if (from === 'status@broadcast') return;

      // Extract message body across plain, extended, media and ephemeral types
      const content =
        msg.message.ephemeralMessage?.message ||
        msg.message.viewOnceMessage?.message ||
        msg.message.viewOnceMessageV2?.message ||
        msg.message;

      const body =
        content.conversation ||
        content.extendedTextMessage?.text ||
        content.imageMessage?.caption ||
        content.videoMessage?.caption ||
        '';

      const prefix = botConfig.prefix;
      if (!body.startsWith(prefix)) return;

      const isGroup = from.endsWith('@g.us');
      const sender = isGroup
        ? (msg.key.participant || msg.participant || from)
        : (msg.key.fromMe ? (sock.user?.id || from) : from);

      const senderClean = sender.split(':')[0].replace(/[^0-9]/g, '');
      const ownerClean = OWNER_NUMBER.replace(/[^0-9]/g, '');
      const isOwner = msg.key.fromMe || senderClean === ownerClean;

      // Privacy check: if PRIVATE mode, only owner can execute
      if (botConfig.mode === 'PRIVATE' && !isOwner) {
        return;
      }

      const args = body.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if (!command) return;

      // Dispatch to 385-command handler
      await handleCommand({
        sock,
        msg,
        from,
        sender,
        isGroup,
        isOwner,
        command,
        args,
        rawText: body,
        botConfig
      });
    } catch (err) {
      console.error('[COMMAND DISPATCH ERROR]', err);
    }
  });
}

// REST API for Website
app.get('/', (req, res) => {
  res.send(`<h1>${BOT_NAME} API</h1><p>Status: ${isConnected ? 'ONLINE' : 'STANDBY'} | Commands: ${ALL_COMMANDS.length}</p>`);
});

app.get('/status', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - uptimeStart) / 1000);
  const memoryUsage = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2);

  res.json({
    bot_name: BOT_NAME,
    status: isConnected ? 'ACTIVE' : 'DISCONNECTED',
    uptime: `${Math.floor(uptimeSeconds / 60)}m ${uptimeSeconds % 60}s`,
    ram: `${memoryUsage} MB`,
    prefix: botConfig.prefix,
    mode: botConfig.mode,
    total_commands: ALL_COMMANDS.length,
    owner: OWNER_NUMBER
  });
});

// Endpoint for Website to request Pairing Code
app.post('/pair', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  const cleanedNumber = phone.replace(/[^0-9]/g, '');
  latestPairingCode = null;

  try {
    if (!sock || !isConnected) {
      await startBot(cleanedNumber);
    } else {
      const code = await sock.requestPairingCode(cleanedNumber);
      latestPairingCode = code;
    }

    // Wait up to 6 seconds for the code
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (latestPairingCode) {
        clearInterval(interval);
        return res.json({ success: true, code: latestPairingCode });
      }
      if (attempts >= 10) {
        clearInterval(interval);
        return res.status(504).json({ success: false, message: 'Pairing code timeout. Please try again.' });
      }
    }, 600);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (DATABASE_URL) {
    startBot();
  }
});
