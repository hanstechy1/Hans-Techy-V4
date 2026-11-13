const express = require('express');
const crypto = require('crypto');
const config = require('./config');
const db = require('./lib/db');
const { sessions, online, REF_RE, startSession, restoreAll } = require('./lib/sessions');
const { loadRemoteKeys } = require('./lib/remoteConfig');
const { migrateLegacyRows } = require('./lib/pgAuthState');

const app = express();
app.disable('x-powered-by');
if (config.trustProxy) app.set('trust proxy', 1);
app.use((req, res, next) => {
  res.set({ 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()' });
  next();
});
app.use(express.json({ limit: config.jsonLimit, strict: true }));
app.use(express.urlencoded({ extended: false, limit: config.jsonLimit }));
const attempts = new Map();
function rateLimit(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  let record = attempts.get(key);
  if (!record || now - record.start > config.pairRateWindowMs) record = { start: now, count: 0 };
  record.count += 1; attempts.set(key, record);
  if (attempts.size > 5000) for (const [ip, item] of attempts) if (now - item.start > config.pairRateWindowMs) attempts.delete(ip);
  if (record.count > config.pairRateLimit) return res.status(429).json({ error: 'Too many pairing attempts. Try again later.' });
  next();
}
function authorized(req) {
  if (config.publicPairing) return true;
  const supplied = req.get('x-admin-token') || req.body?.token;
  if (!config.adminToken || typeof supplied !== 'string') return false;
  const a = Buffer.from(supplied), b = Buffer.from(config.adminToken);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
app.get('/', (_req, res) => {
  res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(config.botName)}</title></head>
  <body style="font-family:system-ui;max-width:440px;margin:40px auto;padding:0 16px"><h2>${escapeHtml(config.botName)}</h2>
  <p>Active sessions: <b id="active">${sessions.size}/${config.maxSessions}</b></p>
  <form id="pair"><p><input name="number" inputmode="numeric" autocomplete="tel" placeholder="2557XXXXXXXX" required style="width:100%;padding:12px;box-sizing:border-box"></p>
  ${config.publicPairing ? '' : '<p><input name="token" type="password" autocomplete="current-password" placeholder="Admin token" required style="width:100%;padding:12px;box-sizing:border-box"></p>'}
  <button style="padding:12px 18px">Get Pairing Code</button></form><pre id="result" aria-live="polite"></pre>
  <p style="color:#666;font-size:14px">WhatsApp → Linked devices → Link with phone number, then enter the code.</p>
  <script>document.getElementById('pair').addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target);const result=document.getElementById('result');result.textContent='Please wait…';try{const r=await fetch('/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({number:f.get('number'),token:f.get('token')})});const j=await r.json();result.textContent=r.ok?'Pairing code: '+j.code:(j.error||'Request failed');}catch(_){result.textContent='Network error. Please try again.';}});</script></body></html>`);
});
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
app.get('/pair', (_req, res) => res.status(405).set('Allow', 'POST').json({ error: 'Use POST /pair. Credentials are never accepted in query strings.' }));
app.post('/pair', rateLimit, async (req, res) => {
  const number = String(req.body?.number || '').replace(/\D/g, '');
  if (number.length < 8 || number.length > 15) return res.status(400).json({ error: 'Invalid phone number. Include country code.' });
  if (!authorized(req)) return res.status(401).json({ error: 'Invalid admin token' });
  try {
    const created = await db.transaction(async (client) => {
      await client.query('SELECT pg_advisory_xact_lock($1)', [741852963]);
      const count = await client.query('SELECT COUNT(*)::int AS n FROM sessions');
      if (count.rows[0].n >= config.maxSessions) return { full: true };
      const result = await client.query('INSERT INTO sessions(id) VALUES($1) ON CONFLICT DO NOTHING RETURNING id', [number]);
      if (!result.rowCount) return { exists: true };
      return { created: true };
    });
    if (created.full) return res.status(503).json({ error: 'Server has reached MAX_SESSIONS' });
    if (created.exists) return res.status(409).json({ error: 'This number already has a session' });
    try {
      const code = await startSession(number, { pairingNumber: number });
      if (!code) throw new Error('Pairing code was not returned');
      return res.json({ code });
    } catch (error) {
      await db.query('DELETE FROM auth_state WHERE session_id=$1', [number]);
      await db.query('DELETE FROM sessions WHERE id=$1', [number]);
      console.error('[pair] failed:', error.message);
      return res.status(502).json({ error: 'Could not create pairing code. Please retry.' });
    }
  } catch (error) {
    console.error('[pair] database error:', error.message);
    return res.status(500).json({ error: 'Pairing service is temporarily unavailable' });
  }
});
app.get('/status/:ref', async (req, res) => {
  const ref = String(req.params.ref || '').toUpperCase();
  if (!REF_RE.test(ref)) return res.status(400).json({ error: 'Invalid Session ID' });
  try {
    const r = await db.query('SELECT id FROM sessions WHERE ref=$1', [ref]);
    if (!r.rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json({ ref, online: online.has(r.rows[0].id) });
  } catch (error) { console.error('[status]', error.message); res.status(503).json({ error: 'Status unavailable' }); }
});
app.get('/healthz', async (_req, res) => {
  try { await db.query('SELECT 1'); res.json({ ok: true, service: config.botName, activeSessions: online.size }); }
  catch { res.status(503).json({ ok: false }); }
});
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError || error.type === 'entity.too.large') return res.status(error.type === 'entity.too.large' ? 413 : 400).json({ error: 'Invalid request body' });
  console.error('[http]', error.message); res.status(500).json({ error: 'Internal server error' });
});
(async () => {
  await db.init();
  if (!config.authStateEncryptionKey) {
    if (config.requireAuthStateEncryption) throw new Error('AUTH_STATE_ENCRYPTION_KEY is required when REQUIRE_AUTH_STATE_ENCRYPTION=true');
    console.warn('[security] AUTH_STATE_ENCRYPTION_KEY is not set; V3-compatible plaintext auth-state fallback is active. Configure a key to encrypt it.');
  } else {
    if (!/^[0-9a-f]{64}$/i.test(config.authStateEncryptionKey)) throw new Error('AUTH_STATE_ENCRYPTION_KEY must be 64 hex characters');
    const migration = await migrateLegacyRows();
    console.log(`[security] migrated ${migration.migrated} legacy auth-state row(s) to encryption`);
  }
  if (!config.publicPairing && !config.adminToken) console.warn('[security] ADMIN_TOKEN is missing; private pairing is disabled.');
  await loadRemoteKeys();
  app.listen(config.port, () => console.log(`${config.botName} listening on port ${config.port}`));
  await restoreAll();
})().catch((error) => { console.error('Failed to start:', error); process.exit(1); });
process.on('unhandledRejection', (error) => console.error('[unhandledRejection]', error));
process.on('uncaughtException', (error) => { console.error('[uncaughtException]', error); process.exit(1); });
