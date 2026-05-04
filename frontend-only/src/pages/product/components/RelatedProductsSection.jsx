import { Link } from 'react-router-dom'

export function RelatedProductsSection({ data }) {
  return (
    <section className="max-w-[1440px] mx-auto px-10 py-section">
      <h3 className="text-headline-md uppercase mb-xl border-b-2 border-black pb-md inline-block">
        {data.title}
      </h3>
      <div className="grid grid-cols-12 gap-gutter">
        {data.items.map((item) => (
          <Link
            key={item.title}
            to={item.slug ? `/products/${item.slug}` : '/products'}
            className="col-span-12 md:col-span-6 lg:col-span-4 group cursor-pointer block"
          >
            <div className="aspect-square bg-surface-container mb-md border border-black overflow-hidden relative">
              <img
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                alt={item.alt}
                src={item.img}
              />
              {item.badge ? (
                <div className="absolute top-0 right-0 bg-black text-white px-md py-sm text-label-bold">
                  {item.badge}
                </div>
              ) : null}
            </div>
            <p className="text-label-bold uppercase">{item.title}</p>
            <p className="text-body-sm text-secondary">{item.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

