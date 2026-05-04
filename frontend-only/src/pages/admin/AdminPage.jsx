import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useCart } from '../../contexts/CartContext'
import {
  ADMIN_FOOTER,
  ADMIN_HEADER,
  ADMIN_NAV_LINKS,
  INVENTORY,
  METRICS,
  PROMOTIONS,
  RECENT_ORDERS,
  REVENUE_PERFORMANCE,
  SYSTEM_LOGS,
} from './adminData'
import { ActivePromotionsCard } from './components/ActivePromotionsCard'
import { AdminHeader } from './components/AdminHeader'
import { InventoryManagementTable } from './components/InventoryManagementTable'
import { MetricsGrid } from './components/MetricsGrid'
import { RecentOrdersCard } from './components/RecentOrdersCard'
import { RevenuePerformanceCard } from './components/RevenuePerformanceCard'
import { SystemLogsCard } from './components/SystemLogsCard'

export function AdminPage() {
  const { cartCount } = useCart()
  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased min-h-screen">
      <TopAppBar links={ADMIN_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-margin py-xl">
        <AdminHeader data={ADMIN_HEADER} />
        <MetricsGrid items={METRICS} />

        <div className="grid grid-cols-12 gap-gutter">
          <RevenuePerformanceCard data={REVENUE_PERFORMANCE} />

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
            <ActivePromotionsCard data={PROMOTIONS} />
          </div>

          <InventoryManagementTable data={INVENTORY} />
          <RecentOrdersCard data={RECENT_ORDERS} />
          <SystemLogsCard data={SYSTEM_LOGS} />
        </div>
      </main>

      <Footer data={ADMIN_FOOTER} />
    </div>
  )
}

