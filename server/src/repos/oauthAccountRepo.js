import { pool } from '../db.js'

export async function findUserByOAuth(provider, providerSub) {
  const [rows] = await pool.query(
    `SELECT u.id, u.email, u.full_name AS fullName, u.role
     FROM oauth_accounts oa
     JOIN users u ON u.id = oa.user_id
     WHERE oa.provider = ? AND oa.provider_sub = ?
     LIMIT 1`,
    [provider, providerSub]
  )
  return rows[0] ?? null
}

export async function insertOAuthAccount({ userId, provider, providerSub }) {
  await pool.query(
    'INSERT INTO oauth_accounts (user_id, provider, provider_sub) VALUES (?, ?, ?)',
    [userId, provider, providerSub]
  )
}
