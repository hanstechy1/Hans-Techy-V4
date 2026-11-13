const { Pool } = require('pg');
const config = require('../config');
const local = !config.databaseUrl || /localhost|127\.0\.0\.1/.test(config.databaseUrl);
const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: local ? false : { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED === 'true' },
  max: Number(process.env.PGPOOL_MAX || 10), idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, statement_timeout: 30000
});
pool.on('error', (err) => console.error('[db] idle client error:', err.message));
const query = (sql, params) => pool.query(sql, params);
async function transaction(callback) {
  const client = await pool.connect();
  try { await client.query('BEGIN'); const result = await callback(client); await client.query('COMMIT'); return result; }
  catch (error) { await client.query('ROLLBACK').catch(() => {}); throw error; }
  finally { client.release(); }
}
async function init() {
  if (!config.databaseUrl) throw new Error('DATABASE_URL is required');
  await query(`
    CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now());
    ALTER TABLE sessions ADD COLUMN IF NOT EXISTS ref TEXT;
    ALTER TABLE sessions ADD COLUMN IF NOT EXISTS welcomed BOOLEAN NOT NULL DEFAULT false;
    CREATE UNIQUE INDEX IF NOT EXISTS sessions_ref_idx ON sessions(ref);
    CREATE TABLE IF NOT EXISTS auth_state (
      session_id TEXT NOT NULL, key TEXT NOT NULL, data TEXT NOT NULL, PRIMARY KEY (session_id, key)
    );
    CREATE TABLE IF NOT EXISTS users (
      number TEXT PRIMARY KEY, name TEXT, role TEXT NOT NULL DEFAULT 'user', banned BOOLEAN NOT NULL DEFAULT false,
      api_provider TEXT, api_key_enc TEXT, daily_count INT NOT NULL DEFAULT 0,
      count_date DATE NOT NULL DEFAULT CURRENT_DATE, created_at TIMESTAMPTZ DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
  `);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ`);
  await query(`CREATE INDEX IF NOT EXISTS users_role_idx ON users(role)`);
  await query(`CREATE INDEX IF NOT EXISTS sessions_created_at_idx ON sessions(created_at)`);
  await query(`CREATE INDEX IF NOT EXISTS auth_state_session_idx ON auth_state(session_id)`);
  await query(`UPDATE users SET role='user' WHERE role IS NULL OR role NOT IN ('user','premium','admin','owner')`);
  const r = await query(`SELECT value FROM settings WHERE key='mode'`);
  if (r.rows[0] && ['public', 'private'].includes(r.rows[0].value)) config.mode = r.rows[0].value;
}
async function setMode(mode) {
  if (!['public', 'private'].includes(mode)) throw new Error('Invalid mode');
  await query(`INSERT INTO settings(key,value) VALUES('mode',$1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value`, [mode]);
  config.mode = mode;
}
module.exports = { pool, query, transaction, init, setMode };
