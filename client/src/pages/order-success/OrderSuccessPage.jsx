import { Link, useSearchParams } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { CHECKOUT_FOOTER, CHECKOUT_NAV_LINKS } from '../checkout/checkoutData'
import { useCart } from '../../contexts/useCart'

export function OrderSuccessPage() {
  const [params] = useSearchParams()
  const { cartCount } = useCart()
  const orderIdRaw = params.get('orderId')
  const orderId =
    orderIdRaw != null && String(orderIdRaw).trim() !== '' ? String(orderIdRaw).trim() : null

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans text-body-md antialiased">
      <TopAppBar links={CHECKOUT_NAV_LINKS} cartCount={cartCount} />

      <main className="flex-grow flex items-center justify-center px-10 py-xxl">
        <div className="w-full max-w-xl text-center space-y-xl border-2 border-black p-xxl bg-white">
          <p className="text-label-bold uppercase tracking-[0.2em] text-secondary">
            Đặt hàng thành công
          </p>
          <h1 className="text-headline-lg uppercase">
            Cảm ơn bạn đã mua hàng tại adidas.
          </h1>
          <p className="text-body-md text-secondary leading-relaxed">
            Đơn của bạn đã được ghi nhận. Chúng tôi sẽ xử lý và liên hệ khi cần (demo — không gửi
            email thật).
          </p>
          {orderId ? (
            <p className="text-body-md">
              <span className="text-label-bold uppercase">Mã đơn hàng:</span>{' '}
              <span className="font-mono text-headline-sm">#{orderId}</span>
            </p>
          ) : null}

          <div
            role="status"
            className="border-2 border-black bg-background p-md text-body-sm text-left"
          >
            Bạn có thể xem lại trạng thái đơn trong mục tài khoản.
          </div>

          <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
            <Link
              to="/account"
              className="bg-black text-white py-md px-xxl text-body-md uppercase hover:bg-zinc-800 transition-colors text-center"
            >
              Xem đơn của tôi
            </Link>
            <Link
              to="/products"
              className="border-2 border-black py-md px-xxl text-body-md uppercase hover:bg-black hover:text-white transition-colors text-center"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </main>

      <Footer data={CHECKOUT_FOOTER} />
    </div>
  )
}
