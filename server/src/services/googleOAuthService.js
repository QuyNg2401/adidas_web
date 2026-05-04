export async function exchangeGoogleCode(code) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  if (!clientId || !clientSecret || !redirectUri) {
    const err = new Error('Google OAuth not configured on server')
    err.statusCode = 503
    throw err
  }

  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  })

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data?.error_description ?? data?.error ?? 'Google token exchange failed')
    err.statusCode = 400
    throw err
  }
  return data
}

export async function fetchGoogleUserInfo(accessToken) {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const profile = await res.json().catch(() => ({}))
  if (!res.ok || !profile?.sub) {
    const err = new Error(profile?.error_description ?? 'Google userinfo failed')
    err.statusCode = 400
    throw err
  }
  return profile
}

export async function googleProfileFromAuthCode(code) {
  const tokens = await exchangeGoogleCode(code)
  const accessToken = tokens.access_token
  if (!accessToken) {
    const err = new Error('Missing access_token from Google')
    err.statusCode = 400
    throw err
  }
  return fetchGoogleUserInfo(accessToken)
}
