export function LoyaltyAndStats({ loyalty, stats }) {
  return (
    <section className="grid grid-cols-12 gap-gutter mb-xxl">
      <div className="col-span-12 lg:col-span-7 border-2 border-black p-lg bg-white flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-xl">
            <div>
              <h2 className="text-headline-md uppercase mb-xs">{loyalty.title}</h2>
              <p className="text-body-sm text-secondary">{loyalty.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-[48px] font-black italic leading-none">
                {loyalty.points}
              </span>
              <span className="block text-label-bold">{loyalty.pointsSuffix}</span>
            </div>
          </div>

          <div className="w-full h-8 bg-surface-container border-2 border-black mb-base overflow-hidden relative">
            <div
              className="absolute inset-y-0 left-0 bg-black"
              style={{ width: `${loyalty.progress}%` }}
            />
          </div>

          <div className="flex justify-between text-label-bold">
            <span>{loyalty.leftLabel}</span>
            <span>{loyalty.rightLabel}</span>
          </div>
        </div>

        <div className="mt-xl flex gap-base">
          <button className="bg-black text-white text-label-bold uppercase px-lg py-md hover:bg-white hover:text-black border-2 border-black transition-all">
            {loyalty.ctas[0]}
          </button>
          <button className="bg-white text-black text-label-bold uppercase px-lg py-md border-2 border-black hover:bg-black hover:text-white transition-all">
            {loyalty.ctas[1]}
          </button>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-gutter">
        {stats.map((s) => {
          const base =
            s.variant === 'black'
              ? 'border-2 border-black bg-black text-white p-lg'
              : s.variant === 'surface'
                ? 'border-2 border-black bg-surface-variant p-lg'
                : 'border-2 border-black bg-white p-lg'

          const iconClass = s.filled ? 'material-symbols-filled' : 'material-symbols-outlined'
          const subtitle = s.variant === 'black' ? 'text-zinc-400' : 'text-secondary'

          return (
            <div key={s.title} className={base}>
              <span className={`${iconClass} mb-md`}>{s.icon}</span>
              <h3 className={`text-label-bold uppercase ${subtitle} mb-xs`}>{s.title}</h3>
              <p className="text-headline-md">{s.value}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

