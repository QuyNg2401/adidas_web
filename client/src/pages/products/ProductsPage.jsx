import { useEffect, useMemo, useState } from 'react'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useCart } from '../../contexts/useCart'
import { api } from '../../lib/api'
import { formatUsdFromCents } from '../../lib/money'
import {
  PRODUCTS_FOOTER,
  PRODUCTS_HEADER,
  PRODUCTS_NAV_LINKS,
} from './productsData'
import { FiltersSidebar } from './components/FiltersSidebar'
import { ProductsGrid } from './components/ProductsGrid'

export function ProductsPage() {
  const { cartCount } = useCart()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [q, setQ] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [loadError, setLoadError] = useState('')

  const query = useMemo(
    () => ({
      q: q.trim(),
      category: categorySlug,
      minPrice,
      maxPrice,
    }),
    [q, categorySlug, minPrice, maxPrice]
  )

  useEffect(() => {
    let cancelled = false
    api.categories
      .list()
      .then((res) => {
        if (!cancelled) setCategories(res.items ?? [])
      })
      .catch(() => {
        if (!cancelled) setCategories([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const handle = setTimeout(() => {
      setLoadError('')
      api.products
        .list(query)
        .then((res) => setItems(res.items ?? []))
        .catch((e) => {
          setItems([])
          setLoadError(e.message ?? 'Không tải được sản phẩm')
        })
    }, 250)
    return () => clearTimeout(handle)
  }, [query])

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

  const countLabel = `${gridProducts.length} ITEMS`

  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased">
      <TopAppBar links={PRODUCTS_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-xxl">
        <div className="grid grid-cols-12 gap-gutter">
          <FiltersSidebar
            categories={categories}
            categorySlug={categorySlug}
            onCategorySlug={setCategorySlug}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPrice={setMinPrice}
            onMaxPrice={setMaxPrice}
          />

          <section className="col-span-12 md:col-span-9">
            <div className="flex flex-col gap-md mb-xl md:flex-row md:justify-between md:items-end">
              <div>
                <h1 className="text-headline-lg uppercase">{PRODUCTS_HEADER.title}</h1>
                <p className="text-label-bold text-secondary mt-xs">{countLabel}</p>
                {loadError ? (
                  <p className="text-red-700 text-body-sm mt-sm">{loadError}</p>
                ) : null}
              </div>
              <label className="flex flex-col gap-xs w-full md:max-w-xs">
                <span className="text-label-bold uppercase">Search</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Name, meta, slug…"
                  className="border-2 border-black bg-transparent px-md py-sm focus:outline-none"
                />
              </label>
            </div>

            <ProductsGrid products={gridProducts} />

            <div className="mt-xxl flex justify-center">
              <button
                type="button"
                className="bg-black text-white px-xl py-md text-headline-sm uppercase hover:bg-white hover:text-black border-2 border-black transition-all"
              >
                Load More
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer data={PRODUCTS_FOOTER} />
    </div>
  )
}
