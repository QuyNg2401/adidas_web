export function MetricsGrid({ items }) {
  const tone = (t) =>
    t === 'up' ? 'text-green-600' : t === 'down' ? 'text-red-600' : 'text-primary'

  return (
    <div className="grid grid-cols-12 gap-gutter mb-xl">
      {items.map((m) => (
        <div
          key={m.label}
          className="col-span-12 md:col-span-3 border-2 border-black p-lg bg-white"
        >
          <div className="flex justify-between items-start mb-md">
            <span className="material-symbols-outlined text-primary">{m.icon}</span>
            <span className={`text-label-bold ${tone(m.deltaTone)}`}>{m.delta}</span>
          </div>
          <p className="text-label-bold text-secondary uppercase mb-xs">{m.label}</p>
          <p className="text-headline-md">{m.value}</p>
        </div>
      ))}
    </div>
  )
}

