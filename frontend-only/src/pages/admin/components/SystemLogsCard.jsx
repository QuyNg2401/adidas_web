export function SystemLogsCard({ data }) {
  return (
    <div className="col-span-12 lg:col-span-6 border-2 border-black bg-surface-container p-lg">
      <h2 className="text-headline-sm uppercase mb-xl">{data.title}</h2>
      <div className="space-y-md">
        {data.rows.map((r) => (
          <div key={r.time} className="flex gap-md">
            <div className="w-1 h-full bg-black self-stretch" />
            <div>
              <p className="text-body-sm">{r.text}</p>
              <p className="text-label-md text-secondary uppercase mt-xs">{r.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

