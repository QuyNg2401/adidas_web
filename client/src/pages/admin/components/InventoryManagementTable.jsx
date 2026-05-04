export function InventoryManagementTable({ data }) {
  return (
    <div className="col-span-12 border-2 border-black bg-white">
      <div className="px-lg py-lg border-b-2 border-black flex flex-col md:flex-row justify-between items-center bg-white">
        <h2 className="text-headline-sm uppercase">{data.title}</h2>
        <div className="relative w-full md:w-96 mt-md md:mt-0">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-secondary">
            search
          </span>
          <input
            className="w-full pl-xl pr-md py-md border border-black focus:ring-0 focus:border-black text-label-bold uppercase"
            placeholder={data.searchPlaceholder}
            type="text"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container border-b-2 border-black">
            <tr>
              {data.columns.map((c) => (
                <th key={c} className="px-lg py-md text-label-bold uppercase">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {data.rows.map((r) => (
              <tr key={r.name}>
                <td className="px-lg py-lg flex items-center gap-md">
                  <div className="w-12 h-12 bg-surface-container flex-shrink-0">
                    <img className="w-full h-full object-cover" alt={r.image.alt} src={r.image.src} />
                  </div>
                  <span className="text-label-bold uppercase">{r.name}</span>
                </td>
                <td className="px-lg py-lg text-body-sm uppercase">{r.category}</td>
                <td className="px-lg py-lg text-body-sm">{r.price}</td>
                <td
                  className={
                    r.status.tone === 'warn'
                      ? 'px-lg py-lg text-body-sm text-red-600'
                      : 'px-lg py-lg text-body-sm'
                  }
                >
                  {r.stock}
                </td>
                <td className="px-lg py-lg">
                  {r.status.tone === 'warn' ? (
                    <span className="inline-block px-md py-xs bg-red-100 text-red-600 border border-red-600 text-label-bold uppercase">
                      {r.status.label}
                    </span>
                  ) : (
                    <span className="inline-block px-md py-xs bg-black text-white text-label-bold uppercase">
                      {r.status.label}
                    </span>
                  )}
                </td>
                <td className="px-lg py-lg">
                  <button className="material-symbols-outlined hover:text-primary transition-colors">
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

