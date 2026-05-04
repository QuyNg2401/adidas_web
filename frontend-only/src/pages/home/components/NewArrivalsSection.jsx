import { Link } from 'react-router-dom'

export function NewArrivalsSection({ data }) {
  const { feature, secondary, highlight } = data.cards

  return (
    <section className="py-section max-w-[1440px] mx-auto px-10">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-headline-lg uppercase italic tracking-tighter">
          {data.title}
        </h2>
        <Link
          className="text-label-bold uppercase border-b-2 border-black pb-1"
          to={data.viewAllTo ?? '/products'}
        >
          {data.viewAllLabel}
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Large Feature Card */}
        <Link
          to={`/products/${feature.slug}`}
          className="col-span-12 md:col-span-8 border-2 border-black group cursor-pointer overflow-hidden block"
        >
          <div className="aspect-[16/9] relative overflow-hidden bg-surface-container">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={feature.image.alt}
              src={feature.image.src}
            />
          </div>
          <div className="p-lg flex justify-between items-start bg-white">
            <div>
              <span className="text-label-bold bg-black text-white px-2 py-1 mb-2 inline-block">
                {feature.tag}
              </span>
              <h3 className="text-headline-sm uppercase">{feature.title}</h3>
              <p className="text-secondary text-body-sm">{feature.subtitle}</p>
            </div>
            <p className="text-headline-sm">{feature.price}</p>
          </div>
        </Link>

        {/* Secondary Card 1 */}
        <Link
          to={`/products/${secondary[0].slug}`}
          className="col-span-12 md:col-span-4 border-2 border-black group cursor-pointer flex flex-col"
        >
          <div className="flex-grow aspect-square relative overflow-hidden bg-surface-container">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={secondary[0].image.alt}
              src={secondary[0].image.src}
            />
          </div>
          <div className="p-lg bg-white border-t-2 border-black">
            <h3 className="text-headline-sm uppercase">{secondary[0].title}</h3>
            <p className="text-secondary text-body-sm">{secondary[0].subtitle}</p>
            <p className="text-headline-sm mt-4">{secondary[0].price}</p>
          </div>
        </Link>

        {/* Secondary Card 2 */}
        <Link
          to={`/products/${secondary[1].slug}`}
          className="col-span-12 md:col-span-4 border-2 border-black group cursor-pointer flex flex-col"
        >
          <div className="flex-grow aspect-square relative overflow-hidden bg-surface-container">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={secondary[1].image.alt}
              src={secondary[1].image.src}
            />
          </div>
          <div className="p-lg bg-white border-t-2 border-black">
            <h3 className="text-headline-sm uppercase">{secondary[1].title}</h3>
            <p className="text-secondary text-body-sm">{secondary[1].subtitle}</p>
            <p className="text-headline-sm mt-4">{secondary[1].price}</p>
          </div>
        </Link>

        {/* Horizontal Highlight */}
        <div className="col-span-12 md:col-span-8 border-2 border-black flex flex-col md:flex-row group cursor-pointer">
          <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden bg-surface-container">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={highlight.image.alt}
              src={highlight.image.src}
            />
          </div>
          <div className="md:w-1/2 p-lg flex flex-col justify-center bg-white border-t-2 md:border-t-0 md:border-l-2 border-black">
            <h3 className="text-headline-md uppercase mb-2">{highlight.title}</h3>
            <p className="text-secondary text-body-md mb-6">
              {highlight.description}
            </p>
            {highlight.cta.to ? (
              <Link
                to={highlight.cta.to}
                className="self-start bg-black text-white px-8 py-3 text-label-bold uppercase"
              >
                {highlight.cta.label}
              </Link>
            ) : (
              <a
                href={highlight.cta.href ?? '#'}
                className="self-start bg-black text-white px-8 py-3 text-label-bold uppercase"
              >
                {highlight.cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

