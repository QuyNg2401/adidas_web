import { useMemo, useState } from 'react'
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
import { ShippingAddressForm } from './components/ShippingAddressForm'
import { useCart } from '../../contexts/useCart'
import { formatUsdFromCents } from '../../lib/money'

const INITIAL_SHIPPING = { fullName: '', phone: '', address: '' }

export function CheckoutPage() {
  const nav = useNavigate()
  const { items, cartCount, clear } = useCart()
  const [shipping, setShipping] = useState(INITIAL_SHIPPING)
  const [shippingErrors, setShippingErrors] = useState({})
  const [shippingBanner, setShippingBanner] = useState('')

  const summaryData = useMemo(() => {
    const subtotalCents = items.reduce(
      (sum, it) => sum + (Number(it.priceCents) || 0) * (Number(it.quantity) || 0),
      0
    )
    const sub = formatUsdFromCents(subtotalCents)
    return {
      ...CHECKOUT_SUMMARY,
      items: items.map((it) => ({
        name: it.name,
        meta: it.variant ?? '',
        price: formatUsdFromCents(it.priceCents),
        img: it.image?.src,
        alt: it.image?.alt ?? '',
      })),
      totals: [
        { label: 'SUBTOTAL', value: sub },
        { label: 'SHIPPING', value: 'FREE' },
      ],
      total: { label: 'TOTAL', value: sub },
    }
  }, [items])

  function setShipField(name, value) {
    setShipping((s) => ({ ...s, [name]: value }))
    setShippingErrors((e) => ({ ...e, [name]: '' }))
    setShippingBanner('')
  }

  function validateShipping() {
    const next = {}
    if (!shipping.fullName.trim()) next.fullName = 'Please enter your full name.'
    const phoneDigits = shipping.phone.replace(/\D/g, '')
    if (!shipping.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (phoneDigits.length < 9) next.phone = 'Phone number needs at least 9 digits.'
    if (!shipping.address.trim()) next.address = 'Please enter your shipping address.'
    setShippingErrors(next)
    const ok = Object.keys(next).length === 0
    if (!ok) {
      setShippingBanner(
        'Shipping details are incomplete or invalid. See the messages under each field.'
      )
    } else {
      setShippingBanner('')
    }
    return ok
  }

  async function onPlaceOrder() {
    if (items.length === 0) return
    if (!validateShipping()) return
    try {
      const result = await api.orders.create({
        items: items.map((it) => ({ slug: it.id, quantity: it.quantity })),
      })
      clear()
      const oid = result?.orderId
      if (oid != null && String(oid).trim() !== '') {
        nav(`/order-success?orderId=${encodeURIComponent(String(oid))}`)
      } else {
        nav('/order-success')
      }
    } catch (e) {
      const msg = e?.message ?? 'Checkout failed'
      if (/401|unauth/i.test(msg)) nav('/login')
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

            {items.length === 0 ? (
              <div
                role="status"
                className="border-2 border-black p-md bg-white text-body-sm max-w-xl"
              >
                Your cart is empty — you cannot complete checkout.{' '}
                <Link to="/products" className="underline font-semibold">
                  Shop products
                </Link>{' '}
                or{' '}
                <Link to="/cart" className="underline font-semibold">
                  return to cart
                </Link>
                .
              </div>
            ) : null}

            {shippingBanner ? (
              <div
                role="alert"
                className="border-2 border-black p-md bg-white text-body-sm text-red-800 max-w-xl"
              >
                {shippingBanner}
              </div>
            ) : null}

            <ShippingAddressForm
              section={CHECKOUT_PAGE.sections[0]}
              data={CHECKOUT_FORMS.shipping}
              values={shipping}
              onFieldChange={setShipField}
              errors={shippingErrors}
            />

            <div className="flex items-center gap-md">
              <button
                type="button"
                onClick={onPlaceOrder}
                disabled={items.length === 0}
                className="bg-black text-white py-md px-xxl text-body-md uppercase hover:bg-zinc-800 transition-colors flex-1 md:flex-none disabled:opacity-40"
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
            <OrderSummarySidebar data={summaryData} />
          </div>
        </div>
      </main>

      <Footer data={CHECKOUT_FOOTER} />
    </div>
  )
}
