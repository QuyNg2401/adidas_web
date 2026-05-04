export function FeaturedSection({ data }) {
  return (
    <section className="grid grid-cols-12 gap-gutter">
      <div className="col-span-12 md:col-span-6 bg-surface-container-high p-xl flex flex-col justify-center border-2 border-black">
        <h2 className="text-headline-md uppercase mb-md">{data.title}</h2>
        <p className="text-body-lg mb-lg max-w-md">{data.body}</p>
        <div>
          <button className="bg-black text-white text-label-bold uppercase px-xl py-md border-2 border-black hover:bg-white hover:text-black transition-all">
            {data.cta}
          </button>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 h-[400px] relative overflow-hidden border-2 border-black">
        <img className="absolute inset-0 w-full h-full object-cover" alt={data.image.alt} src={data.image.src} />
      </div>
    </section>
  )
}

