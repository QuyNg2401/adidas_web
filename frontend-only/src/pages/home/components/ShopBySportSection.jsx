import { Link } from 'react-router-dom'

export function ShopBySportSection({ data }) {
  return (
    <section className="bg-black py-section text-white">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="mb-xxl">
          <h2 className="text-headline-lg uppercase italic tracking-tighter mb-4">
            {data.title}
          </h2>
          <div className="w-24 h-2 bg-white" />
        </div>

        <div className="grid grid-cols-12 gap-gutter">
          {data.sports.map((sport) => (
            <Link
              key={sport.title}
              to="/products"
              className="col-span-12 md:col-span-3 group cursor-pointer relative block"
            >
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={sport.alt}
                  src={sport.img}
                />
              </div>
              <div className="absolute bottom-0 left-0 p-lg bg-black/60 backdrop-blur-sm w-full border-t border-white/20">
                <h4 className="text-headline-sm uppercase tracking-widest">
                  {sport.title}
                </h4>
                <div className="h-0 group-hover:h-8 transition-all overflow-hidden flex items-center">
                  <span className="text-label-bold uppercase text-white/70">
                    EXPLORE GEAR
                  </span>
                  <span className="material-symbols-outlined ml-2">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

