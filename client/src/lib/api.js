const USE_MOCK = import.meta.env.VITE_API_MOCK === '1'

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

async function request(path, { method = 'GET', body, headers, _didRefresh = false } = {}) {
  const url = path.startsWith('/api') ? path : `/api${path}`

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = await res.json().catch(() => ({}))

  const skipSilentRefresh =
    USE_MOCK ||
    _didRefresh ||
    url === '/api/auth/login' ||
    url === '/api/auth/register' ||
    url === '/api/auth/refresh'

  if (res.status === 401 && !skipSilentRefresh) {
    const refr = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    if (refr.ok) {
      return request(path, { method, body, headers, _didRefresh: true })
    }
  }

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
      return {
        items: orders.map((o) => {
          const rest = { ...o }
          delete rest.items
          return rest
        }),
      }
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
  categories: {
    list: async () => {
      if (USE_MOCK) return { items: [] }
      return request('/categories')
    },
  },
  products: {
    list: async (params = {}) => {
      if (USE_MOCK) return { items: [] }
      const qs = new URLSearchParams()
      if (params.q) qs.set('q', params.q)
      if (params.category) qs.set('category', params.category)
      if (params.minPrice !== undefined && params.minPrice !== '')
        qs.set('minPrice', String(params.minPrice))
      if (params.maxPrice !== undefined && params.maxPrice !== '')
        qs.set('maxPrice', String(params.maxPrice))
      if (params.limit) qs.set('limit', String(params.limit))
      const suffix = qs.toString() ? `?${qs.toString()}` : ''
      return request(`/products${suffix}`)
    },
    detail: async (slug) => {
      if (USE_MOCK) throw new Error('Product detail requires API')
      return request(`/products/${encodeURIComponent(slug)}`)
    },
    createReview: async (slug, body) => {
      if (USE_MOCK) throw new Error('Reviews require API')
      return request(`/products/${encodeURIComponent(slug)}/reviews`, {
        method: 'POST',
        body,
      })
    },
  },
  admin: {
    stats: () => request('/admin/stats'),
    categories: () => request('/admin/categories'),
    createCategory: (body) => request('/admin/categories', { method: 'POST', body }),
    updateCategory: (id, body) =>
      request(`/admin/categories/${id}`, { method: 'PATCH', body }),
    deleteCategory: (id) => request(`/admin/categories/${id}`, { method: 'DELETE' }),
    products: () => request('/admin/products'),
    createProduct: (body) => request('/admin/products', { method: 'POST', body }),
    updateProduct: (id, body) =>
      request(`/admin/products/${id}`, { method: 'PATCH', body }),
    deleteProduct: (id) => request(`/admin/products/${id}`, { method: 'DELETE' }),
    orders: () => request('/admin/orders'),
    updateOrderStatus: (id, status) =>
      request(`/admin/orders/${id}`, { method: 'PATCH', body: { status } }),
  },
}

