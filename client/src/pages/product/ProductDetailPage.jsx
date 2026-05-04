import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useAuth } from '../../contexts/useAuth'
import { useCart } from '../../contexts/useCart'
import { api } from '../../lib/api'
import { formatUsdFromCents } from '../../lib/money'
import { PDP_FOOTER, PDP_NAV_LINKS, PRODUCT } from './productData'
import { FeatureSection } from './components/FeatureSection'
import { ProductGallery } from './components/ProductGallery'
import { ProductInfoPanel } from './components/ProductInfoPanel'
import { RelatedProductsSection } from './components/RelatedProductsSection'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const { cartCount } = useCart()

  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(Boolean(slug))
  const [loadError, setLoadError] = useState('')

  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewMsg, setReviewMsg] = useState('')

  useEffect(() => {
    if (!slug) return undefined
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setLoading(true)
      setLoadError('')
      api.products
        .detail(slug)
        .then((d) => {
          if (!cancelled) setDetail(d)
        })
        .catch((e) => {
          if (!cancelled) {
            setDetail(null)
            setLoadError(e.message ?? 'Not found')
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  async function submitReview(e) {
    e.preventDefault()
    setReviewMsg('')
    if (!slug) return
    if (!user) {
      setReviewMsg('Đăng nhập để đánh giá.')
      return
    }
    const commentTrim = reviewComment.trim()
    if (!commentTrim) {
      setReviewMsg('Vui lòng nhập nội dung đánh giá.')
      return
    }
    try {
      const updated = await api.products.createReview(slug, {
        rating: Number(reviewRating),
        comment: commentTrim,
      })
      setDetail((prev) =>
        prev
          ? {
              ...prev,
              reviews: updated.reviews,
              avgRating: updated.avgRating,
              reviewCount: updated.reviewCount,
            }
          : prev
      )
      setReviewComment('')
    } catch (err) {
      setReviewMsg(err.message ?? 'Không gửi được đánh giá')
    }
  }

  const viewProduct = useMemo(() => {
    if (!detail?.product) return null
    const p = detail.product
    const gallery = [{ src: p.imageUrl, alt: p.imageAlt }]
    return {
      slug: p.slug,
      name: p.name,
      priceCents: p.priceCents,
      priceLabel: formatUsdFromCents(p.priceCents),
      breadcrumb: p.categoryName
        ? `${String(p.categoryName).toUpperCase()} / SHOP`
        : PRODUCT.breadcrumb,
      gallery,
      accordions: PRODUCT.accordions,
      avgRating: detail.avgRating,
      reviewCount: detail.reviewCount,
    }
  }, [detail])

  const featureData = useMemo(() => {
    if (!detail?.product) return PRODUCT.feature
    const p = detail.product
    return {
      ...PRODUCT.feature,
      title: String(p.meta ?? '').toUpperCase() || PRODUCT.feature.title,
      body: `${p.name}. ${p.meta}`,
      image: { src: p.imageUrl, alt: p.imageAlt },
    }
  }, [detail])

  const relatedData = useMemo(() => {
    if (!detail?.related) return { ...PRODUCT.related, items: [] }
    return {
      title: PRODUCT.related.title,
      items: detail.related.map((r) => ({
        slug: r.slug,
        title: r.name,
        price: formatUsdFromCents(r.priceCents),
        img: r.imageUrl,
        alt: r.imageAlt,
      })),
    }
  }, [detail])

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-body-md px-10 text-center">
        Invalid product URL.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-body-md uppercase text-secondary">
        Loading…
      </div>
    )
  }

  if (loadError || !detail || !viewProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-body-md px-10 text-center">
        {loadError || 'Product not found'}
      </div>
    )
  }

  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased">
      <TopAppBar links={PDP_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-section">
        <div className="grid grid-cols-12 gap-gutter">
          <ProductGallery images={viewProduct.gallery} />
          <ProductInfoPanel product={viewProduct} />
        </div>

        <section className="max-w-[1440px] mx-auto mt-xxl border-t-2 border-black pt-xxl">
          <h2 className="text-headline-md uppercase mb-lg">Đánh giá</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="space-y-md">
              {(detail.reviews ?? []).length === 0 ? (
                <p className="text-secondary text-body-md">Chưa có đánh giá.</p>
              ) : (
                detail.reviews.map((r) => (
                  <div key={r.id} className="border-2 border-black p-md bg-white">
                    <div className="flex justify-between items-start gap-md">
                      <p className="text-label-bold uppercase">{r.authorName}</p>
                      <span className="text-label-bold">{r.rating}/5</span>
                    </div>
                    <p className="text-body-sm mt-sm">{r.comment}</p>
                    <p className="text-body-sm text-secondary mt-sm">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
                    </p>
                  </div>
                ))
              )}
            </div>

            <form
              className="border-2 border-black p-lg space-y-md bg-surface-container-low"
              onSubmit={submitReview}
              noValidate
            >
              <p className="text-label-bold uppercase">Viết đánh giá</p>
              <label className="flex flex-col gap-xs text-label-bold uppercase">
                Rating (1–5)
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="border-2 border-black bg-white px-md py-sm"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-xs text-label-bold uppercase">
                Comment
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => {
                    setReviewComment(e.target.value)
                    setReviewMsg('')
                  }}
                  className="border-2 border-black bg-white px-md py-sm resize-y"
                />
              </label>
              {reviewMsg ? (
                <p role="alert" className="border-2 border-black bg-white p-md text-red-800 text-body-sm">
                  {reviewMsg}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full bg-black text-white py-md uppercase text-label-bold hover:bg-zinc-800"
              >
                Submit review
              </button>
            </form>
          </div>
        </section>
      </main>

      <FeatureSection data={featureData} />
      <RelatedProductsSection data={relatedData} />

      <Footer data={PDP_FOOTER} />
    </div>
  )
}
