const imgWrap =
  'bg-surface-container overflow-hidden border border-black grayscale hover:grayscale-0 transition-all duration-500'
const imgFit = 'w-full h-full object-cover'

export function ProductGallery({ images }) {
  const list = (Array.isArray(images) ? images : []).filter((x) => x?.src)

  if (list.length === 0) {
    return (
      <section className="col-span-12 lg:col-span-8 border border-black bg-surface-container aspect-[4/5] flex items-center justify-center text-secondary text-body-sm uppercase">
        No image
      </section>
    )
  }

  const [hero, ...rest] = list

  if (rest.length === 0) {
    return (
      <section className="col-span-12 lg:col-span-8">
        <div className={`aspect-[4/5] ${imgWrap}`}>
          <img className={imgFit} alt={hero.alt ?? ''} src={hero.src} />
        </div>
      </section>
    )
  }

  return (
    <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
      <div className={`aspect-[4/5] ${imgWrap}`}>
        <img className={imgFit} alt={hero.alt ?? ''} src={hero.src} />
      </div>

      <div className="grid grid-cols-2 gap-gutter">
        {rest.map((img, i) => {
          const lastAlone = rest.length % 2 === 1 && i === rest.length - 1
          return (
            <div
              key={`${img.src}-${i}`}
              className={`${lastAlone ? 'col-span-2 aspect-video' : 'aspect-square'} ${imgWrap}`}
            >
              <img className={imgFit} alt={img.alt ?? ''} src={img.src} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
