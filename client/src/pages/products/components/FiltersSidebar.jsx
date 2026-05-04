export function FiltersSidebar({
  categories = [],
  categorySlug,
  onCategorySlug,
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
}) {
  return (
    <aside className="col-span-12 md:col-span-3 space-y-xl">
      <div className="space-y-md">
        <h2 className="text-headline-sm uppercase border-b-2 border-black pb-2">
          Category
        </h2>
        <ul className="space-y-sm">
          <li>
            <button
              type="button"
              onClick={() => onCategorySlug?.('')}
              className={`text-label-bold hover:underline ${!categorySlug ? 'underline' : ''}`}
            >
              ALL
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => onCategorySlug?.(c.slug)}
                className={`text-label-bold hover:underline ${
                  categorySlug === c.slug ? 'underline' : ''
                }`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-md">
        <h2 className="text-headline-sm uppercase border-b-2 border-black pb-2">
          Price (USD)
        </h2>
        <div className="flex flex-col gap-sm">
          <label className="text-label-bold uppercase flex flex-col gap-xs">
            Min
            <input
              type="number"
              min="0"
              step="1"
              value={minPrice}
              onChange={(e) => onMinPrice?.(e.target.value)}
              className="border-2 border-black bg-transparent px-md py-sm focus:outline-none"
            />
          </label>
          <label className="text-label-bold uppercase flex flex-col gap-xs">
            Max
            <input
              type="number"
              min="0"
              step="1"
              value={maxPrice}
              onChange={(e) => onMaxPrice?.(e.target.value)}
              className="border-2 border-black bg-transparent px-md py-sm focus:outline-none"
            />
          </label>
        </div>
      </div>
    </aside>
  )
}
