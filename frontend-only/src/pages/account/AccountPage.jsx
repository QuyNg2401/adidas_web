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
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../lib/api'
import { AccountHeader } from './components/AccountHeader'
import { FeaturedSection } from './components/FeaturedSection'
import { LoyaltyAndStats } from './components/LoyaltyAndStats'
import { OrderHistoryTable } from './components/OrderHistoryTable'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../../contexts/CartContext'

export function AccountPage() {
  const { user } = useAuth()
  const { cartCount } = useCart()
  const [myOrders, setMyOrders] = useState([])

  useEffect(() => {
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
  }, [])

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
    name: user?.fullName?.toUpperCase?.() ? user.fullName.toUpperCase() : ACCOUNT.name,
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

