import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  const nav = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user || user.role !== 'admin') nav('/login', { replace: true })
  }, [user, loading, nav])

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-body-md uppercase text-secondary">
        Checking access…
      </div>
    )
  }

  return children
}
