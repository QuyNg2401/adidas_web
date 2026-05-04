export function OrderSummarySidebar({ data }) {
  return (
    <aside className="sticky top-xxl space-y-lg">
      <div className="border-2 border-black bg-white p-lg">
        <h3 className="text-headline-sm uppercase border-b-2 border-black pb-md mb-lg">
          {data.title}
        </h3>

        <div className="space-y-md">
          {data.items.map((item) => (
            <div key={item.name} className="flex gap-md">
              <div className="w-24 h-24 bg-surface-container flex-shrink-0">
                <img className="w-full h-full object-cover" alt={item.alt} src={item.img} />
              </div>
              <div className="flex-1">
                <p className="text-label-bold uppercase">{item.name}</p>
                <p className="text-body-sm text-secondary uppercase">{item.meta}</p>
                <p className="text-label-md mt-xs">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-xl border-t-2 border-black pt-lg space-y-sm">
          {data.totals.map((t) => (
            <div key={t.label} className="flex justify-between text-body-md">
              <span className="text-secondary">{t.label}</span>
              <span>{t.value}</span>
            </div>
          ))}
          <div className="flex justify-between text-headline-sm pt-md">
            <span>{data.total.label}</span>
            <span>{data.total.value}</span>
          </div>
        </div>

        <div className="mt-lg">
          <label className="text-label-bold uppercase block mb-xs">
            {data.promo.label}
          </label>
          <div className="flex">
            <input
              className="flex-1 border border-black bg-transparent py-sm px-md focus:ring-0 focus:border-black text-body-sm"
              placeholder={data.promo.placeholder}
              type="text"
            />
            <button className="bg-black text-white px-lg text-label-md uppercase hover:bg-zinc-800 transition-colors">
              {data.promo.button}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface-container p-md flex items-center gap-md">
        <span className="material-symbols-filled text-2xl">verified_user</span>
        <p className="text-body-sm uppercase font-bold">{data.secure}</p>
      </div>
    </aside>
  )
}

