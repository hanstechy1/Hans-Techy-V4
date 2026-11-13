# HANS TECHY V4 upgrade notes

## Compatibility
- V4 keeps the existing PostgreSQL tables and session identifiers used by V3.
- Existing WhatsApp sessions and auth-state rows are intended to remain readable.
- No destructive database reset is required.

## Before deployment
1. Back up the PostgreSQL database.
2. Stop the V3 process before starting V4 against the same database.
3. Keep the existing DATABASE_URL and ENCRYPTION_KEY values.
4. Configure ADMIN_TOKEN and set PUBLIC_PAIRING=false unless public pairing is intentional.
5. Configure AUTH_STATE_ENCRYPTION_KEY before requiring encrypted auth-state writes.
6. Configure KEYS_REPO and a read-only repository token only after the companion Key repository has been made private.

## Secrets
- Never commit .env, provider API keys, GitHub tokens, encryption keys, or plaintext keys.json.
- The companion Key repository should contain only encrypted keys.enc and safe templates/docs.
- Set repository visibility to Private in GitHub Settings before uploading any real encrypted key material.

## Validation
Run npm install, npm run check, then test database connectivity and a WhatsApp pairing/restore cycle in a staging environment before production.
