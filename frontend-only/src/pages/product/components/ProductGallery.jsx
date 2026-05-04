export function ProductGallery({ images }) {
  return (
    <section className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-gutter">
      <div className="col-span-2 aspect-[4/5] bg-surface-container overflow-hidden border border-black">
        <img
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          alt={images[0].alt}
          src={images[0].src}
        />
      </div>

      <div className="col-span-1 aspect-square bg-surface-container border border-black">
        <img className="w-full h-full object-cover grayscale" alt={images[1].alt} src={images[1].src} />
      </div>
      <div className="col-span-1 aspect-square bg-surface-container border border-black">
        <img className="w-full h-full object-cover grayscale" alt={images[2].alt} src={images[2].src} />
      </div>

      <div className="col-span-2 aspect-video bg-surface-container border border-black">
        <img
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          alt={images[3].alt}
          src={images[3].src}
        />
      </div>
    </section>
  )
}

