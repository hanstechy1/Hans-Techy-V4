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

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const BOT_NAME = process.env.BOT_NAME || 'HANS TECHY V2';
const PREFIX = process.env.PREFIX || '.';
const OWNER_NUMBER = process.env.OWNER_NUMBER || '255686005775';

let sock = null;
let isConnected = false;
let uptimeStart = Date.now();
let latestPairingCode = null;

const dbAdapter = DATABASE_URL ? createDbAuthAdapter(DATABASE_URL) : null;

async function startBot(requestPairingPhone = null) {
  if (!dbAdapter) {
    console.error('[FATAL] DATABASE_URL is not configured in Heroku Config Vars!');
    return;
  }

  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await dbAdapter.useDatabaseAuthState();

  sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04']
  });

  // Pairing code request
  if (requestPairingPhone && !sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        const cleanedNumber = requestPairingPhone.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(cleanedNumber);
        latestPairingCode = code;
        console.log(`[PAIRING] Generated pairing code for ${cleanedNumber}: ${code}`);
      } catch (err) {
        console.error('[PAIRING ERROR]', err);
      }
    }, 2500);
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      isConnected = false;
      console.log('[BOT] Connection closed. Auto-reconnecting:', shouldReconnect);
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === 'open') {
      isConnected = true;
      console.log(`[BOT] Connected successfully! ${BOT_NAME} is ONLINE.`);
      uptimeStart = Date.now();
    }
  });

  // Incoming message listener & command handler
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    try {
      const msg = messages[0];
      if (!msg || !msg.message) return;

      const messageContent =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.ephemeralMessage?.message?.conversation ||
        msg.message.ephemeralMessage?.message?.extendedTextMessage?.text ||
        '';

      const body = messageContent.trim();
      if (!body.startsWith(PREFIX)) return;

      const from = msg.key.remoteJid;
      const isFromMe = msg.key.fromMe;
      console.log(`[CMD] Received from ${from}: "${body}" (fromMe: ${isFromMe})`);

      const args = body.slice(PREFIX.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      switch (command) {
        case 'ping':
        case 'alive': {
          const pingTime = Date.now() - (msg.messageTimestamp * 1000 || Date.now());
          const reply = `*╭─「 ${BOT_NAME} 」─╮*\n│ ⚡ Speed: ${Math.abs(pingTime)}ms\n│ ⏱️ Status: ACTIVE 🟢\n│ 👑 Owner: ${OWNER_NUMBER}\n│ ☁️ Host: Heroku / Linux\n│ ⌨️ Prefix: [ ${PREFIX} ]\n╰────────────────────╯`;
          await sock.sendMessage(from, { text: reply }, { quoted: msg });
          break;
        }

        case 'menu':
        case 'help': {
          const menuText = `*╭─ ${BOT_NAME} ─╮*\n│ 👑 Owner: ${OWNER_NUMBER}\n│ ⚙️ Mode: PUBLIC\n│ ☁️ Host: Heroku / Linux\n│ ⏱️ Status: ONLINE 🟢\n│ ⌨️ Prefix: [ ${PREFIX} ]\n│ 🤖 Total Commands: 147\n╰──────────────────╯\n\n*TRY COMMANDS:*\n⋄ ${PREFIX}ping\n⋄ ${PREFIX}alive\n⋄ ${PREFIX}uptime\n⋄ ${PREFIX}ai <your question>\n⋄ ${PREFIX}owner`;
          await sock.sendMessage(from, { text: menuText }, { quoted: msg });
          break;
        }

        case 'uptime': {
          const totalSecs = Math.floor((Date.now() - uptimeStart) / 1000);
          const hrs = Math.floor(totalSecs / 3600);
          const mins = Math.floor((totalSecs % 3600) / 60);
          const secs = totalSecs % 60;
          await sock.sendMessage(from, { text: `⏱️ *Uptime:* ${hrs}h ${mins}m ${secs}s` }, { quoted: msg });
          break;
        }

        case 'owner': {
          await sock.sendMessage(from, { text: `👑 *Owner:* wa.me/${OWNER_NUMBER.replace(/[^0-9]/g, '')}` }, { quoted: msg });
          break;
        }

        case 'ai':
        case 'gpt': {
          const query = args.join(' ');
          if (!query) {
            await sock.sendMessage(from, { text: `⚠️ Please provide a prompt.\nExample: *${PREFIX}ai Hello, how are you?*` }, { quoted: msg });
            return;
          }
          await sock.sendMessage(from, { text: `🤖 *[${BOT_NAME} AI]*\n\nQuery: "${query}"\n\nI am active and processing your request.` }, { quoted: msg });
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error('[COMMAND RUNTIME ERROR]', error);
    }
  });
}

// REST API endpoint for status
app.get('/status', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - uptimeStart) / 1000);
  const memoryUsage = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2);

  res.json({
    bot_name: BOT_NAME,
    status: isConnected ? 'ACTIVE' : 'DISCONNECTED',
    uptime: `${Math.floor(uptimeSeconds / 60)}m ${uptimeSeconds % 60}s`,
    ram: `${memoryUsage} MB`,
    prefix: PREFIX,
    owner: OWNER_NUMBER
  });
});

// REST API endpoint for Pairing Code
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
  console.log(`[SERVER] Running on port ${PORT}`);
  if (DATABASE_URL) {
    startBot();
  }
});
