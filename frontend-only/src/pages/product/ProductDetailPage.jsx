import { useParams } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useCart } from '../../contexts/CartContext'
import { PDP_FOOTER, PDP_NAV_LINKS, PRODUCT } from './productData'
import { FeatureSection } from './components/FeatureSection'
import { ProductGallery } from './components/ProductGallery'
import { ProductInfoPanel } from './components/ProductInfoPanel'
import { RelatedProductsSection } from './components/RelatedProductsSection'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { cartCount } = useCart()
  const product = { ...PRODUCT, slug: slug ?? PRODUCT.slug }

  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased">
      <TopAppBar links={PDP_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-10 py-section">
        <div className="grid grid-cols-12 gap-gutter">
          <ProductGallery images={product.gallery} />
          <ProductInfoPanel product={product} />
        </div>
      </main>

      <FeatureSection data={product.feature} />
      <RelatedProductsSection data={product.related} />

      <Footer data={PDP_FOOTER} />
    </div>
  )
}

