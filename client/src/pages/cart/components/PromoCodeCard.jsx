export function PromoCodeCard({ data }) {
  return (
    <div className="mt-gutter p-lg border-2 border-black bg-white">
      <h4 className="text-label-bold uppercase mb-md">{data.title}</h4>
      <div className="flex">
        <input
          className="flex-1 border-y border-l border-black p-md focus:outline-none font-bold uppercase text-sm"
          placeholder={data.placeholder}
          type="text"
        />
        <button className="bg-black text-white px-lg font-bold uppercase hover:bg-zinc-800 transition-colors">
          {data.buttonLabel}
        </button>
      </div>
    </div>
  )
}

