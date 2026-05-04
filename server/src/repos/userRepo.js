import { pool } from '../db.js'

export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, email, password_hash AS passwordHash, full_name AS fullName, role FROM users WHERE email = ? LIMIT 1',
    [email]
  )
  return rows[0] ?? null
}

export async function findUserById(id) {
  const [rows] = await pool.query(
    'SELECT id, email, full_name AS fullName, role FROM users WHERE id = ? LIMIT 1',
    [id]
  )
  return rows[0] ?? null
}

export async function createUser({ email, passwordHash, fullName, role = 'customer' }) {
  const [result] = await pool.query(
    'INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)',
    [email, passwordHash, fullName, role]
  )
  return { id: result.insertId, email, fullName, role }
}

