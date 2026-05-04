export function FeatureSection({ data }) {
  return (
    <section className="bg-black text-white py-section">
      <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-12 gap-gutter items-center">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="text-headline-lg uppercase mb-lg leading-none">
            {data.title}
          </h2>
          <p className="text-body-lg text-zinc-400 mb-xl">{data.body}</p>
          <div className="flex gap-lg">
            {data.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-white pl-md">
                <p className="text-headline-md">{s.value}</p>
                <p className="text-label-bold uppercase text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="aspect-video bg-zinc-900 border border-zinc-800">
            <img
              className="w-full h-full object-cover opacity-80"
              alt={data.image.alt}
              src={data.image.src}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

