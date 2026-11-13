const crypto = require('crypto');
const {
  default: makeWASocket, DisconnectReason, fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore, Browsers, jidNormalizedUser
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('../config');
const { query } = require('./db');
const usePgAuthState = require('./pgAuthState');
const handleMessage = require('./handler');
const { sleep } = require('./utils');
const logger = pino({ level: process.env.LOG_LEVEL || 'silent' });
const sessions = new Map();
const online = new Set();
const REF_RE = /^HANS~[0-9A-F]{12}$/;
const genRef = () => `HANS~${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
const starting = new Map();
async function ensureRef(id) {
  const r = await query('SELECT ref FROM sessions WHERE id=$1', [id]);
  if (!r.rows[0]) return null;
  if (r.rows[0].ref) return r.rows[0].ref;
  for (let i = 0; i < 5; i++) {
    const ref = genRef();
    try {
      const updated = await query('UPDATE sessions SET ref=$2 WHERE id=$1 AND ref IS NULL RETURNING ref', [id, ref]);
      if (updated.rows[0]) return updated.rows[0].ref;
      const current = await query('SELECT ref FROM sessions WHERE id=$1', [id]);
      return current.rows[0]?.ref || null;
    } catch (error) { if (error.code !== '23505') throw error; }
  }
  throw new Error('Could not allocate a unique session reference');
}
async function announce(sock, id) {
  const r = await query('SELECT ref, welcomed FROM sessions WHERE id=$1', [id]);
  const row = r.rows[0];
  if (!row || row.welcomed || !row.ref) return;
  await sock.sendMessage(jidNormalizedUser(sock.user.id), { text:
    `✅ *${config.botName}* is connected.\n\n🆔 *Session ID:* ${row.ref}\n\n` +
    `This is a reference ID only.\n• ${config.prefix}session → view it again\n• ${config.prefix}logout ${row.ref} → remove this session` });
  await query('UPDATE sessions SET welcomed=true WHERE id=$1', [id]);
}
async function removeSession(id, expectedSocket) {
  if (expectedSocket && sessions.get(id) !== expectedSocket) return;
  const sock = sessions.get(id);
  sessions.delete(id); online.delete(id);
  if (sock) { try { sock.end(undefined); } catch {} }
  await query('DELETE FROM auth_state WHERE session_id=$1', [id]);
  await query('DELETE FROM sessions WHERE id=$1', [id]);
  console.log(`[session:${id.slice(-4)}] removed`);
}
async function startSession(id, { pairingNumber } = {}) {
  if (starting.has(id)) return starting.get(id);
  if (sessions.has(id)) return null;
  const task = (async () => {
    await ensureRef(id);
    const { state, saveCreds } = await usePgAuthState(id);
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({ version, logger,
      auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
      browser: Browsers.ubuntu('Chrome'), markOnlineOnConnect: false, syncFullHistory: false,
      connectTimeoutMs: 60000, defaultQueryTimeoutMs: 60000 });
    sessions.set(id, sock);
    sock.ev.on('creds.update', () => saveCreds().catch((e) => console.error('[auth] save failed:', e.message)));
    sock.ev.on('messages.upsert', ({ messages, type }) => {
      if (type !== 'notify') return;
      for (const message of messages) handleMessage(sock, message).catch((e) => console.error('[handler]', e.message));
    });
    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
      if (connection === 'open') {
        online.add(id); console.log(`[session:${id.slice(-4)}] connected`);
        announce(sock, id).catch((e) => console.error('[announce]', e.message)); return;
      }
      if (connection !== 'close') return;
      online.delete(id);
      if (sessions.get(id) !== sock) return;
      const code = lastDisconnect?.error?.output?.statusCode;
      const paired = Boolean(sock.authState?.creds?.me || state.creds.me);
      const registered = Boolean(state.creds.registered);
      if (code === DisconnectReason.loggedOut || (!paired && !registered)) return removeSession(id, sock);
      console.log(`[session:${id.slice(-4)}] disconnected (${code || 'unknown'}); reconnecting`);
      sessions.delete(id);
      const delay = code === DisconnectReason.restartRequired ? 1000 : 5000;
      await sleep(delay);
      if (!sessions.has(id)) startSession(id).catch((e) => console.error('[reconnect]', e.message));
    });
    if (!state.creds.registered && pairingNumber) {
      await sleep(2500);
      if (sessions.get(id) !== sock) throw new Error('Pairing socket closed before code generation');
      return await sock.requestPairingCode(pairingNumber);
    }
    return null;
  })();
  starting.set(id, task);
  try { return await task; }
  catch (error) {
    const sock = sessions.get(id);
    if (sock) { sessions.delete(id); try { sock.end(undefined); } catch {} }
    throw error;
  } finally { starting.delete(id); }
}
async function restoreAll() {
  const { rows } = await query('SELECT id FROM sessions ORDER BY created_at ASC');
  for (const { id } of rows) {
    startSession(id).catch((e) => console.error(`[session:${id.slice(-4)}] restore failed:`, e.message));
    await sleep(1500);
  }
  console.log(`[sessions] restore requested for ${rows.length} existing session(s)`);
}
module.exports = { sessions, online, REF_RE, startSession, restoreAll, removeSession };
