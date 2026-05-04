import { z } from 'zod'
import { createRefreshToken, revokeRefreshTokenById } from '../repos/refreshTokenRepo.js'
import { insertOAuthAccount, findUserByOAuth } from '../repos/oauthAccountRepo.js'
import { createUser, findUserByEmail, findUserById } from '../repos/userRepo.js'
import { pool } from '../db.js'
import {
  hashPassword,
  randomToken,
  sha256,
  signAccessToken,
  verifyAccessToken,
  verifyPassword,
} from '../utils/auth.js'
import { googleProfileFromAuthCode } from './googleOAuthService.js'

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function register(input) {
  const data = RegisterSchema.parse(input)
  const existing = await findUserByEmail(data.email)
  if (existing) {
    const err = new Error('Email already exists')
    err.statusCode = 409
    throw err
  }
  const passwordHash = await hashPassword(data.password)
  const user = await createUser({
    email: data.email,
    passwordHash,
    fullName: data.fullName,
    role: 'customer',
  })
  return user
}

function refreshDays() {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? 30)
  return Number.isFinite(days) && days > 0 ? days : 30
}

async function issueAuthSession(userRow) {
  const accessToken = signAccessToken({
    sub: userRow.id,
    role: userRow.role,
    email: userRow.email,
  })

  const rawRefresh = randomToken()
  const tokenHash = sha256(rawRefresh)
  const expiresAt = new Date(Date.now() + refreshDays() * 24 * 60 * 60 * 1000)
  await createRefreshToken({ userId: userRow.id, tokenHash, expiresAt })

  return {
    accessToken,
    refreshToken: rawRefresh,
    user: {
      id: userRow.id,
      email: userRow.email,
      fullName: userRow.fullName,
      role: userRow.role,
    },
  }
}

export async function login(input) {
  const data = LoginSchema.parse(input)
  const user = await findUserByEmail(data.email)
  if (!user) {
    const err = new Error('Invalid credentials')
    err.statusCode = 401
    throw err
  }
  const ok = await verifyPassword(data.password, user.passwordHash)
  if (!ok) {
    const err = new Error('Invalid credentials')
    err.statusCode = 401
    throw err
  }

  return issueAuthSession({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  })
}

export async function googleOAuthComplete(code) {
  const profile = await googleProfileFromAuthCode(code)
  if (!profile.email) {
    const err = new Error('Google account missing email permission')
    err.statusCode = 400
    throw err
  }

  const existingOAuth = await findUserByOAuth('google', profile.sub)
  if (existingOAuth) {
    return issueAuthSession({
      id: existingOAuth.id,
      email: existingOAuth.email,
      fullName: existingOAuth.fullName,
      role: existingOAuth.role,
    })
  }

  const existingByEmail = await findUserByEmail(profile.email)
  if (existingByEmail) {
    await insertOAuthAccount({
      userId: existingByEmail.id,
      provider: 'google',
      providerSub: profile.sub,
    })
    return issueAuthSession({
      id: existingByEmail.id,
      email: existingByEmail.email,
      fullName: existingByEmail.fullName,
      role: existingByEmail.role,
    })
  }

  const passwordHash = await hashPassword(randomToken())
  const fullName = profile.name ?? profile.email.split('@')[0] ?? 'Google user'
  const created = await createUser({
    email: profile.email,
    passwordHash,
    fullName,
    role: 'customer',
  })

  await insertOAuthAccount({
    userId: created.id,
    provider: 'google',
    providerSub: profile.sub,
  })

  return issueAuthSession({
    id: created.id,
    email: created.email,
    fullName: created.fullName,
    role: created.role,
  })
}

export async function meFromAccessToken(accessToken) {
  const payload = verifyAccessToken(accessToken)
  const userId = Number(payload.sub)
  if (!userId) throw new Error('Invalid token payload')
  const user = await findUserById(userId)
  if (!user) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }
  return user
}

export async function refresh({ refreshToken }) {
  if (!refreshToken) {
    const err = new Error('Missing refresh token')
    err.statusCode = 401
    throw err
  }

  // Token contains no user id; we look up by hash only
  const tokenHash = sha256(refreshToken)
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, expires_at AS expiresAt, revoked_at AS revokedAt
     FROM refresh_tokens
     WHERE token_hash = ? AND revoked_at IS NULL
     LIMIT 1`,
    [tokenHash]
  )
  const row = rows[0]
  if (!row) {
    const err = new Error('Invalid refresh token')
    err.statusCode = 401
    throw err
  }
  if (new Date(row.expiresAt).getTime() < Date.now()) {
    await revokeRefreshTokenById(row.id)
    const err = new Error('Refresh token expired')
    err.statusCode = 401
    throw err
  }

  const user = await findUserById(row.userId)
  if (!user) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role, email: user.email })
  return { accessToken, user }
}

export async function logout({ refreshToken }) {
  if (!refreshToken) return
  const tokenHash = sha256(refreshToken)
  // revoke by hash
  const [rows] = await pool.query(
    `SELECT id FROM refresh_tokens WHERE token_hash = ? AND revoked_at IS NULL LIMIT 1`,
    [tokenHash]
  )
  if (rows[0]?.id) await revokeRefreshTokenById(rows[0].id)
}

