import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../../lib/api'
import { formatUsdFromCents } from '../../../lib/money'
import { ProductCard } from '../../products/components/ProductCard'

export function NewArrivalsSection({ data }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    api.products
      .list({ limit: 2 })
      .then((res) => {
        if (!cancelled) setItems(res.items ?? [])
      })
      .catch(() => {
        if (!cancelled) setItems([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const gridProducts = useMemo(
    () =>
      items.map((p) => ({
        slug: p.slug,
        name: p.name,
        meta: p.meta,
        price: formatUsdFromCents(p.priceCents),
        priceCents: p.priceCents,
        img: p.imageUrl,
        alt: p.imageAlt,
      })),
    [items]
  )

  const viewHref = data.viewAllHref?.startsWith('/') ? data.viewAllHref : '/products'

  return (
    <section className="py-section max-w-[1440px] mx-auto px-10">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-headline-lg uppercase italic tracking-tighter">
          {data.title}
        </h2>
        <Link
          className="text-label-bold uppercase border-b-2 border-black pb-1 hover:bg-black hover:text-white px-1 transition-colors"
          to={viewHref}
        >
          {data.viewAllLabel}
        </Link>
      </div>

      {loading ? (
        <p className="text-secondary text-body-md uppercase text-label-bold">Đang tải…</p>
      ) : gridProducts.length === 0 ? (
        <p className="text-secondary text-body-md">
          Chưa có sản phẩm.{' '}
          <Link className="underline font-bold text-black" to="/products">
            Xem cửa hàng
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto">
          {gridProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
