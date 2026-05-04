export function OrderHistoryTable({ data }) {
  return (
    <section className="mb-section">
      <div className="flex justify-between items-end mb-lg border-b-4 border-black pb-base">
        <h2 className="text-headline-lg uppercase">{data.title}</h2>
        <button className="text-label-bold uppercase underline mb-base" type="button">
          {data.viewAll}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-lg text-label-bold uppercase">ORDER ID</th>
              <th className="py-lg text-label-bold uppercase">DATE</th>
              <th className="py-lg text-label-bold uppercase">ITEMS</th>
              <th className="py-lg text-label-bold uppercase">TOTAL</th>
              <th className="py-lg text-label-bold uppercase">STATUS</th>
              <th className="py-lg text-label-bold uppercase text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-body-md">
            {data.rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-black hover:bg-surface-container transition-colors"
              >
                <td className="py-lg font-bold">{r.id}</td>
                <td className="py-lg text-secondary">{r.date}</td>
                <td className="py-lg">{r.items}</td>
                <td className="py-lg font-bold">{r.total}</td>
                <td className="py-lg">
                  <span className="bg-black text-white px-2 py-1 text-label-bold">
                    {r.status}
                  </span>
                </td>
                <td className="py-lg text-right">
                  <button className="text-label-bold uppercase border-2 border-black px-md py-1 hover:bg-black hover:text-white transition-all">
                    DETAILS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

