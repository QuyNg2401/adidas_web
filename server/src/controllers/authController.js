import {
  googleOAuthComplete,
  login,
  logout,
  meFromAccessToken,
  refresh,
  register,
} from '../services/authService.js'

function isProd() {
  return (process.env.NODE_ENV ?? 'development') === 'production'
}

function setAuthCookies(res, { refreshToken, accessToken }) {
  if (accessToken) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd(),
    })
  }
  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd(),
    })
  }
}

export async function registerController(req, res) {
  try {
    const user = await register(req.body ?? {})
    return res.status(201).json({ user })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function loginController(req, res) {
  try {
    const result = await login(req.body ?? {})
    setAuthCookies(res, result)
    return res.json({ accessToken: result.accessToken, user: result.user })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function meController(req, res) {
  try {
    const token =
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.slice('Bearer '.length)
        : null) ?? req.cookies?.accessToken

    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const user = await meFromAccessToken(token)
    return res.json({ user })
  } catch (err) {
    return res.status(err.statusCode ?? 401).json({ error: err.message ?? 'Unauthorized' })
  }
}

export async function refreshController(req, res) {
  try {
    const token = req.cookies?.refreshToken
    const result = await refresh({ refreshToken: token })
    setAuthCookies(res, { accessToken: result.accessToken })
    return res.json({ accessToken: result.accessToken, user: result.user })
  } catch (err) {
    return res.status(err.statusCode ?? 401).json({ error: err.message ?? 'Unauthorized' })
  }
}

export function googleStartController(_req, res) {
  const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  if (!clientId || !redirectUri) {
    return res.redirect(`${clientOrigin}/login?error=oauth_not_configured`)
  }
  const scope = encodeURIComponent('openid email profile')
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=${scope}&access_type=offline&prompt=consent`
  return res.redirect(url)
}

export async function googleCallbackController(req, res) {
  const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'
  try {
    const code = req.query.code
    if (!code) return res.redirect(`${clientOrigin}/login?error=oauth_denied`)

    const result = await googleOAuthComplete(code)
    setAuthCookies(res, result)
    return res.redirect(`${clientOrigin}/account`)
  } catch (err) {
    console.error('[auth/google/callback]', err?.message ?? err)
    return res.redirect(`${clientOrigin}/login?error=oauth_failed`)
  }
}

export async function logoutController(req, res) {
  try {
    const token = req.cookies?.refreshToken
    await logout({ refreshToken: token })
  } finally {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return res.json({ ok: true })
  }
}

