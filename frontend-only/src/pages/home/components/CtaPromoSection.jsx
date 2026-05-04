export function CtaPromoSection({ data }) {
  return (
    <section className="border-y-2 border-black bg-white py-xxl">
      <div className="max-w-[1440px] mx-auto px-10 text-center">
        <p className="text-label-bold uppercase tracking-[0.4em] mb-4">
          {data.kicker}
        </p>
        <h2 className="text-headline-lg uppercase mb-8">{data.title}</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <input
            className="border-2 border-black px-6 py-4 text-label-bold uppercase w-full md:w-96 focus:ring-0 focus:border-black outline-none"
            placeholder={data.inputPlaceholder}
            type="email"
          />
          <button className="bg-black text-white px-10 py-4 text-label-bold uppercase hover:bg-zinc-800 transition-colors">
            {data.buttonLabel}
          </button>
        </div>
      </div>
    </section>
  )
}

