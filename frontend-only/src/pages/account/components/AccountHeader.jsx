export function AccountHeader({ data }) {
  return (
    <section className="mb-section">
      <div className="grid grid-cols-12 gap-gutter items-end">
        <div className="col-span-12 md:col-span-8">
          <span className="text-label-bold uppercase text-secondary mb-base block">
            {data.label}
          </span>
          <h1 className="text-display uppercase leading-none">{data.name}</h1>
        </div>

        <div className="col-span-12 md:col-span-4 flex md:justify-end">
          <div className="bg-black text-white px-lg py-md flex flex-col items-start w-full md:w-auto">
            <span className="text-label-bold">{data.memberSinceLabel}</span>
            <span className="text-headline-sm uppercase">{data.memberSinceValue}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

