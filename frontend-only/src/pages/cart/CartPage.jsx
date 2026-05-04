import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import {
  CART_FOOTER,
  CART_NAV_LINKS,
  CART_PAGE,
  ORDER_SUMMARY,
  PROMO,
  RECOMMENDATIONS,
} from './cartData'
import { CartItem } from './components/CartItem'
import { OrderSummary } from './components/OrderSummary'
import { PromoCodeCard } from './components/PromoCodeCard'
import { RecommendationsSection } from './components/RecommendationsSection'
import { useCart } from '../../contexts/CartContext'

export function CartPage() {
  const { items, cartCount } = useCart()

  return (
    <div className="bg-background text-primary font-sans text-body-md antialiased">
      <TopAppBar links={CART_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-section min-h-screen">
        <div className="mb-xxl">
          <h1 className="text-display uppercase">{CART_PAGE.title}</h1>
          <p className="text-label-bold text-secondary uppercase mt-base">
            {CART_PAGE.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 space-y-lg">
            {items.map((i) => (
              <CartItem key={i.id} item={i} />
            ))}
          </div>

          <div className="md:col-span-4">
            <OrderSummary data={ORDER_SUMMARY} />
            <PromoCodeCard data={PROMO} />
          </div>
        </div>

        <RecommendationsSection data={RECOMMENDATIONS} />
      </main>

      <Footer data={CART_FOOTER} />
    </div>
  )
}

