export function RevenuePerformanceCard({ data }) {
  return (
    <div className="col-span-12 lg:col-span-8 border-2 border-black bg-white p-lg relative overflow-hidden">
      <div className="flex justify-between items-center mb-xl">
        <h2 className="text-headline-sm uppercase">{data.title}</h2>
        <div className="flex gap-base">
          <span className="text-label-bold bg-black text-white px-md py-xs">
            {data.tabs[0]}
          </span>
          <span className="text-label-bold bg-surface-container px-md py-xs">
            {data.tabs[1]}
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full flex items-end gap-base border-b border-l border-black p-md">
        <div
          className="w-full bg-black h-[40%]"
          style={{
            clipPath:
              'polygon(0 80%, 20% 60%, 40% 70%, 60% 30%, 80% 40%, 100% 10%, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      <div className="flex justify-between mt-md text-label-bold uppercase">
        {data.days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  )
}

