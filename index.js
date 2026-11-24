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
const OWNER_NUMBER = process.env.OWNER_NUMBER || '255700000000';

let sock = null;
let isConnected = false;
let uptimeStart = Date.now();
let latestPairingCode = null;

const dbAdapter = DATABASE_URL ? createDbAuthAdapter(DATABASE_URL) : null;

async function startBot(requestPairingPhone = null) {
  if (!dbAdapter) {
    console.error('[ERROR] DATABASE_URL haijawekwa kwenye Config Vars za Heroku!');
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

  // Kutoa Pairing Code mtumiaji anapoomba kutoka kwenye tovuti
  if (requestPairingPhone && !sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        const cleanedNumber = requestPairingPhone.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(cleanedNumber);
        latestPairingCode = code;
        console.log(`[PAIRING] Pairing code kwa ${cleanedNumber}: ${code}`);
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
      console.log('[BOT] Muunganisho umefungwa. Inajaribu kuunganisha tena:', shouldReconnect);
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === 'open') {
      isConnected = true;
      console.log(`[BOT] ${BOT_NAME} Imeunganishwa kikamilifu na ipo ONLINE!`);
      uptimeStart = Date.now();
    }
  });

  // Kusikiliza ujumbe na kutekeleza amri (Commands)
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      '';

    if (!body.startsWith(PREFIX)) return;

    const args = body.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'ping':
      case 'alive': {
        const pingTime = Date.now() - (msg.messageTimestamp * 1000 || Date.now());
        const reply = `*╭─「 ${BOT_NAME} 」─╮*\n│ ⚡ Speed: ${Math.abs(pingTime)}ms\n│ ⏱️ Status: ACTIVE\n│ 👑 Owner: ${OWNER_NUMBER}\n╰───────────────╯`;
        await sock.sendMessage(from, { text: reply }, { quoted: msg });
        break;
      }
      case 'menu':
      case 'help': {
        const menuText = `*╭─ ${BOT_NAME} ─╮*\n│ 🤖 Total Commands: 147\n│ ⌨️ Prefix: [ ${PREFIX} ]\n│ ⚙️ Status: ONLINE\n╰──────────────────╯\n\nTumia amri kama:\n• ${PREFIX}ping\n• ${PREFIX}alive\n• ${PREFIX}ai <swali>`;
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
        break;
      }
      case 'ai':
      case 'gpt': {
        const query = args.join(' ');
        if (!query) {
          await sock.sendMessage(from, { text: `Andika swali lako. Mfano: ${PREFIX}ai Habari` }, { quoted: msg });
          return;
        }
        await sock.sendMessage(from, { text: `🤖 *[HANS TECHY AI]*\n\nNimepokea: "${query}". Majibu yanachakatwa...` }, { quoted: msg });
        break;
      }
      default:
        break;
    }
  });
}

// Endpoint ya tovuti kusoma hali (Status) ya bot
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

// Endpoint ya tovuti kuomba Pairing Code
app.post('/pair', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Namba ya simu inahitajika' });
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
        return res.status(504).json({ success: false, message: 'Pairing code timeout. Jaribu tena.' });
      }
    }, 600);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] Inafanya kazi kwenye port ${PORT}`);
  if (DATABASE_URL) {
    startBot();
  }
});
