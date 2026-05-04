import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { api } from '../../lib/api'
import {
  CHECKOUT_ACTIONS,
  CHECKOUT_FOOTER,
  CHECKOUT_FORMS,
  CHECKOUT_NAV_LINKS,
  CHECKOUT_PAGE,
  CHECKOUT_SUMMARY,
} from './checkoutData'
import { CheckoutHeader } from './components/CheckoutHeader'
import { OrderSummarySidebar } from './components/OrderSummarySidebar'
import { PaymentMethodSection } from './components/PaymentMethodSection'
import { ShippingAddressForm } from './components/ShippingAddressForm'
import { useCart } from '../../contexts/CartContext'

export function CheckoutPage() {
  const nav = useNavigate()
  const { items, cartCount, clear } = useCart()

  async function onPlaceOrder() {
    try {
      await api.orders.create({
        items: items.map((it) => ({ slug: it.id, quantity: it.quantity })),
      })
      clear()
      nav('/account')
    } catch (e) {
      const msg = e?.message ?? 'Checkout failed'
      if (msg.toLowerCase().includes('unauth')) nav('/login')
      else alert(msg)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen font-sans text-body-md antialiased">
      <TopAppBar links={CHECKOUT_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-xxl">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-8 space-y-section">
            <CheckoutHeader title={CHECKOUT_PAGE.title} />

            <ShippingAddressForm
              section={CHECKOUT_PAGE.sections[0]}
              data={CHECKOUT_FORMS.shipping}
            />

            <PaymentMethodSection
              section={CHECKOUT_PAGE.sections[1]}
              data={CHECKOUT_FORMS.payment}
            />

            <div className="flex items-center gap-md">
              <button
                onClick={onPlaceOrder}
                className="bg-black text-white py-md px-xxl text-body-md uppercase hover:bg-zinc-800 transition-colors flex-1 md:flex-none"
              >
                {CHECKOUT_ACTIONS.primary}
              </button>
              <Link
                to="/cart"
                className="bg-white text-black border-2 border-black py-md px-xxl text-body-md uppercase hover:bg-black hover:text-white transition-all hidden md:block"
              >
                {CHECKOUT_ACTIONS.secondary}
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <OrderSummarySidebar data={CHECKOUT_SUMMARY} />
          </div>
        </div>
      </main>

      <Footer data={CHECKOUT_FOOTER} />
    </div>
  )
}

