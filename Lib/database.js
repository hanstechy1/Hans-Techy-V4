const { Pool } = require('pg');
const { initAuthCreds, BufferJSON, proto } = require('@whiskeysockets/baileys');

function createDbAuthAdapter(databaseUrl, sessionId = 'hans-techy-main') {
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl && databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  async function init() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_store (
        session_id VARCHAR(100) NOT NULL,
        key_id VARCHAR(255) NOT NULL,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (session_id, key_id)
      );
    `);
  }

  async function useDatabaseAuthState() {
    await init();

    const writeData = async (key, data) => {
      const serialized = JSON.stringify(data, BufferJSON.replacer);
      await pool.query(
        `INSERT INTO session_store (session_id, key_id, value, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (session_id, key_id)
         DO UPDATE SET value = $3, updated_at = NOW()`,
        [sessionId, key, JSON.parse(serialized)]
      );
    };

    const readData = async (key) => {
      const res = await pool.query(
        'SELECT value FROM session_store WHERE session_id = $1 AND key_id = $2',
        [sessionId, key]
      );
      if (res.rows.length === 0) return null;
      return JSON.parse(JSON.stringify(res.rows[0].value), BufferJSON.reviver);
    };

    const removeData = async (key) => {
      await pool.query(
        'DELETE FROM session_store WHERE session_id = $1 AND key_id = $2',
        [sessionId, key]
      );
    };

    let creds = await readData('creds');
    if (!creds) {
      creds = initAuthCreds();
      await writeData('creds', creds);
    }

    return {
      state: {
        creds,
        keys: {
          get: async (type, ids) => {
            const data = {};
            for (const id of ids) {
              let value = await readData(`${type}-${id}`);
              if (type === 'app-state-sync-key' && value) {
                value = proto.Message.AppStateSyncKeyData.fromObject(value);
              }
              data[id] = value;
            }
            return data;
          },
          set: async (data) => {
            for (const category in data) {
              for (const id in data[category]) {
                const value = data[category][id];
                const key = `${category}-${id}`;
                if (value) {
                  await writeData(key, value);
                } else {
                  await removeData(key);
                }
              }
            }
          }
        }
      },
      saveCreds: () => writeData('creds', creds),
      pool
    };
  }

  return { useDatabaseAuthState, pool };
}

module.exports = { createDbAuthAdapter };
