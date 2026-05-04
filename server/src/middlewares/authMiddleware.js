import { verifyAccessToken } from '../utils/auth.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization
  const tokenFromHeader =
    header && header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null

  const token = tokenFromHeader ?? req.cookies?.accessToken ?? null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const payload = verifyAccessToken(token)
    req.user = payload
    return next()
  } catch (_err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  return next()
}

