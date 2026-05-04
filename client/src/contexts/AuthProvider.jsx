import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function bootstrap() {
      try {
        const me = await api.auth.me()
        if (!cancelled) setUser(me.user ?? null)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async ({ email, password }) => {
        const result = await api.auth.login({ email, password })
        setUser(result.user ?? null)
        return result
      },
      register: async ({ email, password, fullName }) => {
        const result = await api.auth.register({ email, password, fullName })
        return result
      },
      logout: async () => {
        try {
          await api.auth.logout()
        } catch {
          /* vẫn đăng xuất cục bộ */
        } finally {
          setUser(null)
        }
      },
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
