import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import {
  CART_FOOTER,
  CART_NAV_LINKS,
  CART_PAGE,
  ORDER_SUMMARY,
  PROMO,
} from './cartData'
import { CartItem } from './components/CartItem'
import { OrderSummary } from './components/OrderSummary'
import { PromoCodeCard } from './components/PromoCodeCard'
import { useCart } from '../../contexts/useCart'
import { formatUsdFromCents } from '../../lib/money'

export function CartPage() {
  const { items, cartCount } = useCart()

  const subtitle = `${cartCount} ITEMS READY FOR PERFORMANCE`

  const orderSummaryData = useMemo(() => {
    const subtotalCents = items.reduce(
      (sum, it) => sum + (Number(it.priceCents) || 0) * (Number(it.quantity) || 0),
      0
    )
    const sub = formatUsdFromCents(subtotalCents)
    return {
      ...ORDER_SUMMARY,
      rows: [
        { label: 'SUBTOTAL', value: sub, muted: true },
        { label: 'ESTIMATED SHIPPING', value: 'FREE' },
        { label: 'TAX (MOCK)', value: '$0.00' },
      ],
      totalValue: sub,
    }
  }, [items])

  const lineItems = useMemo(
    () =>
      items.map((i) => ({
        ...i,
        priceLabel: formatUsdFromCents(i.priceCents),
      })),
    [items]
  )

  return (
    <div className="bg-background text-primary font-sans text-body-md antialiased">
      <TopAppBar links={CART_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-section min-h-screen">
        <div className="mb-xxl">
          <h1 className="text-display uppercase">{CART_PAGE.title}</h1>
          <p className="text-label-bold text-secondary uppercase mt-base">{subtitle}</p>
        </div>

        {items.length === 0 ? (
          <p className="text-body-lg text-secondary mb-xxl">
            Your cart is empty. Browse{' '}
            <Link className="underline font-bold text-black" to="/products">
              all products
            </Link>
            .
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 space-y-lg">
            {lineItems.map((i) => (
              <CartItem key={i.id} item={i} />
            ))}
          </div>

          <div className="md:col-span-4">
            <OrderSummary data={orderSummaryData} />
            <PromoCodeCard data={PROMO} />
          </div>
        </div>
      </main>

      <Footer data={CART_FOOTER} />
    </div>
  )
}
