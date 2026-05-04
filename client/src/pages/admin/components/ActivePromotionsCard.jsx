export function ActivePromotionsCard({ data }) {
  return (
    <div className="flex-1 border-2 border-black bg-black text-white p-lg">
      <h3 className="text-headline-sm uppercase mb-md">{data.title}</h3>
      <div className="space-y-md">
        {data.items.map((p) => (
          <div key={p.code} className="border border-zinc-700 p-md">
            <p className="text-label-bold text-zinc-400 mb-xs">{p.code}</p>
            <p className="text-body-md">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

