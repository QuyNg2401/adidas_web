export function AdminHeader({ data }) {
  return (
    <div className="mb-xxl flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-lg">
      <div>
        <span className="text-label-bold text-primary mb-xs block">{data.kicker}</span>
        <h1 className="text-headline-lg uppercase">{data.title}</h1>
      </div>
      <div className="mt-md md:mt-0 flex gap-base">
        <button className="bg-black text-white px-lg py-md text-label-bold uppercase hover:bg-zinc-800 transition-colors">
          {data.actions[0]}
        </button>
        <button className="bg-white border-2 border-black text-black px-lg py-md text-label-bold uppercase hover:bg-black hover:text-white transition-colors">
          {data.actions[1]}
        </button>
      </div>
    </div>
  )
}

