import { Link } from 'react-router-dom'

export function HeroBanner({ hero }) {
  return (
    <section className="relative h-[921px] w-full overflow-hidden bg-black flex items-center">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        alt={hero.image.alt}
        src={hero.image.src}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-10 w-full">
        <div className="max-w-4xl">
          <h1 className="text-display text-white mb-6 uppercase">
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h1>
          <p className="text-headline-md text-white/90 mb-10 max-w-2xl">
            {hero.description}
          </p>
          <div className="flex gap-4">
            {hero.ctas.map((cta) => {
              const cls =
                cta.variant === 'primary'
                  ? 'bg-white text-black text-label-bold px-10 py-5 uppercase hover:bg-zinc-200 transition-colors'
                  : 'border-2 border-white text-white text-label-bold px-10 py-5 uppercase hover:bg-white hover:text-black transition-colors'
              return cta.to ? (
                <Link key={cta.label} to={cta.to} className={cls}>
                  {cta.label}
                </Link>
              ) : (
                <a key={cta.label} href={cta.href ?? '#'} className={cls}>
                  {cta.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

