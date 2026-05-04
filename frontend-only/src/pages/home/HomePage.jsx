import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import {
  CTA_PROMO,
  FOOTER,
  HERO,
  NAV_LINKS,
  NEW_ARRIVALS,
  SHOP_BY_SPORT,
} from './homeData'
import { useCart } from '../../contexts/CartContext'
import { CtaPromoSection } from './components/CtaPromoSection'
import { HeroBanner } from './components/HeroBanner'
import { NewArrivalsSection } from './components/NewArrivalsSection'
import { ShopBySportSection } from './components/ShopBySportSection'

export function HomePage() {
  const { cartCount } = useCart()
  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased">
      <TopAppBar links={NAV_LINKS} cartCount={cartCount} />
      <main>
        <HeroBanner hero={HERO} />
        <NewArrivalsSection data={NEW_ARRIVALS} />
        <ShopBySportSection data={SHOP_BY_SPORT} />
        <CtaPromoSection data={CTA_PROMO} />
      </main>
      <Footer data={FOOTER} />
    </div>
  )
}

