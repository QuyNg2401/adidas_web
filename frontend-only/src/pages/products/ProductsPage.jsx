import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import {
  FILTERS,
  PRODUCTS,
  PRODUCTS_FOOTER,
  PRODUCTS_HEADER,
  PRODUCTS_NAV_LINKS,
} from './productsData'
import { FiltersSidebar } from './components/FiltersSidebar'
import { ProductsGrid } from './components/ProductsGrid'
import { useCart } from '../../contexts/CartContext'

export function ProductsPage() {
  const { cartCount } = useCart()
  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased">
      <TopAppBar links={PRODUCTS_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-xxl">
        <div className="grid grid-cols-12 gap-gutter">
          <FiltersSidebar data={FILTERS} />

          <section className="col-span-12 md:col-span-9">
            <div className="flex justify-between items-end mb-xl">
              <h1 className="text-headline-lg uppercase">{PRODUCTS_HEADER.title}</h1>
              <p className="text-label-bold text-secondary">{PRODUCTS_HEADER.countLabel}</p>
            </div>

            <ProductsGrid products={PRODUCTS} />

            <div className="mt-xxl flex justify-center">
              <button className="bg-black text-white px-xl py-md text-headline-sm uppercase hover:bg-white hover:text-black border-2 border-black transition-all">
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

