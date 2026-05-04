export function RecentOrdersCard({ data }) {
  const pill = (s) =>
    s === 'Processing'
      ? 'px-md py-xs bg-zinc-200 text-label-bold text-[10px] uppercase'
      : 'px-md py-xs bg-black text-white text-label-bold text-[10px] uppercase'

  return (
    <div className="col-span-12 lg:col-span-6 border-2 border-black bg-white p-lg">
      <h2 className="text-headline-sm uppercase mb-xl">{data.title}</h2>
      <div className="space-y-md">
        {data.rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between border-b border-black/10 pb-md"
          >
            <div>
              <p className="text-label-bold uppercase">{r.id}</p>
              <p className="text-body-sm text-secondary">{r.meta}</p>
            </div>
            <span className={pill(r.status)}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

