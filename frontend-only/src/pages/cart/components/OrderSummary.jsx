import { Link } from 'react-router-dom'

export function OrderSummary({ data }) {
  return (
    <div className="bg-primary text-on-primary p-lg sticky top-32">
      <h3 className="text-headline-md uppercase mb-lg">{data.title}</h3>

      <div className="space-y-md border-b border-zinc-700 pb-lg mb-lg">
        {data.rows.map((r) => (
          <div key={r.label} className="flex justify-between items-center">
            <span className="text-body-md uppercase text-zinc-400">{r.label}</span>
            <span
              className={
                r.muted ? 'text-headline-sm' : 'text-body-md uppercase text-on-primary'
              }
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-xl">
        <span className="text-headline-sm uppercase">{data.totalLabel}</span>
        <span className="text-headline-md">{data.totalValue}</span>
      </div>

      <Link
        to="/checkout"
        className="w-full bg-white text-black text-headline-sm py-lg px-xl hover:bg-zinc-200 transition-all active:scale-[0.98] uppercase text-center"
      >
        {data.ctaLabel}
      </Link>

      <div className="mt-lg">
        <p className="text-label-bold text-zinc-500 uppercase flex items-center gap-xs">
          <span className="material-symbols-outlined text-sm">lock</span>
          {data.secureLabel}
        </p>
      </div>

      <div className="mt-xl pt-xl border-t border-zinc-800">
        <h4 className="text-label-bold uppercase mb-md">ACCEPTED PAYMENTS</h4>
        <div className="flex gap-md opacity-50 grayscale">
          {data.paymentIcons.map((i) => (
            <span key={i} className="material-symbols-outlined text-3xl">
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

