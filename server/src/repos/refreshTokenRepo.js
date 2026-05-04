import { pool } from '../db.js'

export async function createRefreshToken({ userId, tokenHash, expiresAt }) {
  const [result] = await pool.query(
    'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
    [userId, tokenHash, expiresAt]
  )
  return result.insertId
}

export async function findValidRefreshToken({ userId, tokenHash }) {
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, expires_at AS expiresAt, revoked_at AS revokedAt
     FROM refresh_tokens
     WHERE user_id = ? AND token_hash = ? AND revoked_at IS NULL
     LIMIT 1`,
    [userId, tokenHash]
  )
  return rows[0] ?? null
}

export async function revokeRefreshTokenById(id) {
  await pool.query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = ?', [id])
}

