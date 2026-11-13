require('dotenv').config();
const num = (v, d, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max ? n : d;
};
const bool = (v, d = false) => v === undefined || v === '' ? d : v === 'true';
module.exports = {
  botName: process.env.BOT_NAME || 'HANS TECHY V4',
  prefix: process.env.PREFIX || '.',
  ownerNumber: (process.env.OWNER_NUMBER || '').replace(/\D/g, ''),
  mode: (process.env.MODE || 'public').toLowerCase() === 'private' ? 'private' : 'public',
  port: num(process.env.PORT, 3000, 1, 65535),
  databaseUrl: process.env.DATABASE_URL,
  encryptionKey: process.env.ENCRYPTION_KEY,
  authStateEncryptionKey: process.env.AUTH_STATE_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY,
  requireAuthStateEncryption: bool(process.env.REQUIRE_AUTH_STATE_ENCRYPTION, false),
  adminToken: process.env.ADMIN_TOKEN,
  publicPairing: bool(process.env.PUBLIC_PAIRING),
  maxSessions: num(process.env.MAX_SESSIONS, 5, 1, 1000),
  pairRateLimit: num(process.env.PAIR_RATE_LIMIT, 5, 1, 100),
  pairRateWindowMs: num(process.env.PAIR_RATE_WINDOW_MS, 900000, 1000),
  jsonLimit: process.env.JSON_LIMIT || '16kb',
  trustProxy: bool(process.env.TRUST_PROXY),
  limits: { user: num(process.env.LIMIT_USER, 20), premium: num(process.env.LIMIT_PREMIUM, 200) },
  allowSharedKeys: bool(process.env.ALLOW_SHARED_KEYS),
  remoteKeys: {
    repo: process.env.KEYS_REPO, token: process.env.KEYS_REPO_TOKEN,
    file: process.env.KEYS_FILE || 'keys.enc', ref: process.env.KEYS_REF || 'main',
    allowPlain: bool(process.env.KEYS_ALLOW_PLAIN),
    secret: process.env.KEYS_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY
  },
  sharedKeys: { gemini: process.env.GEMINI_API_KEY, openai: process.env.OPENAI_API_KEY },
  models: { gemini: process.env.GEMINI_MODEL || 'gemini-2.0-flash', openai: process.env.OPENAI_MODEL || 'gpt-4o-mini' },
  aiTimeoutMs: num(process.env.AI_TIMEOUT_MS, 45000, 1000, 180000),
  maxPromptChars: num(process.env.MAX_PROMPT_CHARS, 12000, 100, 100000)
};
