export function FiltersSidebar({ data }) {
  return (
    <aside className="col-span-12 md:col-span-3 space-y-xl">
      <div className="space-y-md">
        <h2 className="text-headline-sm uppercase border-b-2 border-black pb-2">
          Category
        </h2>
        <ul className="space-y-sm">
          {data.categories.map((c) => (
            <li key={c}>
              <button className="text-label-bold hover:underline">{c}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-md">
        <h2 className="text-headline-sm uppercase border-b-2 border-black pb-2">
          Size
        </h2>
        <div className="grid grid-cols-4 gap-xs">
          {data.sizes.map((s) => (
            <button
              key={s}
              className={
                s === data.selectedSize
                  ? 'border border-black py-2 text-label-bold bg-black text-white'
                  : 'border border-black py-2 text-label-bold hover:bg-black hover:text-white transition-colors'
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-md">
        <h2 className="text-headline-sm uppercase border-b-2 border-black pb-2">
          Price Range
        </h2>
        <div className="space-y-sm">
          {data.priceRanges.map((r) => (
            <label key={r} className="flex items-center gap-sm text-label-bold">
              <input
                className="w-4 h-4 border-2 border-black rounded-none checked:bg-black focus:ring-0"
                type="checkbox"
              />
              {r}
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

