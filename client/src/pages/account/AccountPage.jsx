import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import {
  ACCOUNT,
  ACCOUNT_FOOTER,
  ACCOUNT_NAV_LINKS,
  FEATURED,
  LOYALTY,
  ORDER_HISTORY,
  STATS,
} from './accountData'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import { api } from '../../lib/api'
import { AccountHeader } from './components/AccountHeader'
import { FeaturedSection } from './components/FeaturedSection'
import { LoyaltyAndStats } from './components/LoyaltyAndStats'
import { OrderHistoryTable } from './components/OrderHistoryTable'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../../contexts/useCart'

export function AccountPage() {
  const { user, loading } = useAuth()
  const { cartCount } = useCart()
  const [myOrders, setMyOrders] = useState([])

  useEffect(() => {
    if (!user) return
    let mounted = true
    api.orders
      .my()
      .then((res) => {
        if (!mounted) return
        setMyOrders(res.items ?? [])
      })
      .catch(() => {
        if (!mounted) return
        setMyOrders([])
      })
    return () => {
      mounted = false
    }
  }, [user])

  const orderHistoryData = useMemo(() => {
    const rows = (myOrders ?? []).map((o) => {
      const id = `#${o.id}`
      const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''
      const total = typeof o.totalCents === 'number' ? `$${(o.totalCents / 100).toFixed(2)}` : ''
      return {
        id,
        date,
        items: '-',
        total,
        status: String(o.status ?? '').toUpperCase(),
      }
    })
    return { ...ORDER_HISTORY, rows }
  }, [myOrders])

  const header = {
    ...ACCOUNT,
    name: user?.fullName?.trim?.()
      ? user.fullName.toUpperCase()
      : user?.email?.toUpperCase?.() ?? ACCOUNT.name,
  }

  if (loading) {
    return (
      <div className="bg-background text-on-background min-h-screen flex flex-col font-sans">
        <TopAppBar links={ACCOUNT_NAV_LINKS} cartCount={cartCount} />
        <main className="flex-grow flex items-center justify-center px-10 py-xxl">
          <p className="text-headline-sm uppercase tracking-tighter">Đang tải…</p>
        </main>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased">
      <TopAppBar links={ACCOUNT_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-xxl">
        <AccountHeader data={header} />
        <LoyaltyAndStats loyalty={LOYALTY} stats={STATS} />
        <OrderHistoryTable data={orderHistoryData} />
        <FeaturedSection data={FEATURED} />
      </main>

      <Footer data={ACCOUNT_FOOTER} />
    </div>
  )
}

