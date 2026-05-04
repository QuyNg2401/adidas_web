const USE_MOCK = true
function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getMockUser() {
  return readJson('stride_mock_user', null)
}

function setMockUser(user) {
  if (!user) localStorage.removeItem('stride_mock_user')
  else writeJson('stride_mock_user', user)
}

function getMockOrders() {
  return readJson('stride_mock_orders', [])
}

function setMockOrders(orders) {
  writeJson('stride_mock_orders', orders)
}

function mockDelay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms))
}

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(path.startsWith('/api') ? path : `/api${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error ?? `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data
}

export const api = {
  auth: {
    register: async (payload) => {
      if (!USE_MOCK) return request('/auth/register', { method: 'POST', body: payload })
      await mockDelay()
      const fullName = payload?.fullName || 'MOCK USER'
      const email = payload?.email || 'mock@example.com'
      return { ok: true, user: { id: 1, fullName, email, role: 'customer' } }
    },
    login: async (payload) => {
      if (!USE_MOCK) return request('/auth/login', { method: 'POST', body: payload })
      await mockDelay()
      const email = payload?.email || 'mock@example.com'
      const isAdmin = String(email).toLowerCase().includes('admin')
      const user = {
        id: isAdmin ? 999 : 1,
        fullName: isAdmin ? 'MOCK ADMIN' : 'MOCK USER',
        email,
        role: isAdmin ? 'admin' : 'customer',
      }
      setMockUser(user)
      return { ok: true, user }
    },
    me: async () => {
      if (!USE_MOCK) return request('/auth/me')
      await mockDelay(120)
      const user = getMockUser()
      if (!user) throw new Error('Unauthorized')
      return { user }
    },
    refresh: async () => {
      if (!USE_MOCK) return request('/auth/refresh', { method: 'POST' })
      await mockDelay(80)
      const user = getMockUser()
      if (!user) throw new Error('Unauthorized')
      return { ok: true }
    },
    logout: async () => {
      if (!USE_MOCK) return request('/auth/logout', { method: 'POST' })
      await mockDelay(80)
      setMockUser(null)
      return { ok: true }
    },
  },
  orders: {
    create: async (payload) => {
      if (!USE_MOCK) return request('/orders', { method: 'POST', body: payload })
      await mockDelay()
      const user = getMockUser()
      if (!user) throw new Error('Unauthorized')

      const now = new Date().toISOString()
      const id = Math.floor(Math.random() * 90000) + 10000
      const items = Array.isArray(payload?.items) ? payload.items : []
      const totalCents = items.reduce((sum, it) => sum + (Number(it.quantity) || 0) * 1000, 0) // mock total

      const orders = getMockOrders()
      orders.unshift({ id, status: 'pending', totalCents, createdAt: now, items })
      setMockOrders(orders)
      return { orderId: id }
    },
    my: async () => {
      if (!USE_MOCK) return request('/orders/my')
      await mockDelay(150)
      const user = getMockUser()
      if (!user) throw new Error('Unauthorized')
      const orders = getMockOrders()
      return { items: orders.map(({ items, ...rest }) => rest) }
    },
    myById: async (id) => {
      if (!USE_MOCK) return request(`/orders/my/${id}`)
      await mockDelay(150)
      const user = getMockUser()
      if (!user) throw new Error('Unauthorized')
      const orders = getMockOrders()
      const found = orders.find((o) => String(o.id) === String(id))
      if (!found) throw new Error('Not found')
      return { order: found }
    },
  },
}

