import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash)
}

export function signAccessToken(payload) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is missing')
  const expiresIn = process.env.JWT_EXPIRES_IN ?? '15m'
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is missing')
  return jwt.verify(token, secret)
}

export function randomToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

