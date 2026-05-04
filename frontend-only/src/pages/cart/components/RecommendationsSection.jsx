export function RecommendationsSection({ data }) {
  const { big, topRight, bottomLeft, bottomRight } = data.tiles

  return (
    <section className="mt-section">
      <h3 className="text-headline-md uppercase mb-xl">{data.title}</h3>

      <div className="grid grid-cols-12 gap-gutter h-[600px]">
        <div className="col-span-12 md:col-span-5 h-full relative group cursor-pointer overflow-hidden border-2 border-black">
          <img
            alt={big.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={big.img}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-lg">
            <h4 className="text-white text-headline-sm uppercase">{big.title}</h4>
            <button className="mt-md bg-white text-black py-base font-bold uppercase w-max px-lg">
              {big.button}
            </button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col gap-gutter h-full">
          <div className="flex-1 relative group cursor-pointer overflow-hidden border-2 border-black">
            <img
              alt={topRight.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={topRight.img}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-lg">
              <h4 className="text-white text-headline-sm uppercase">{topRight.title}</h4>
              <button className="mt-md bg-white text-black py-base font-bold uppercase w-max px-lg">
                {topRight.button}
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-gutter">
            <div className="relative group cursor-pointer overflow-hidden border-2 border-black">
              <img
                alt={bottomLeft.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={bottomLeft.img}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-base">
                <h4 className="text-white text-sm font-bold uppercase">{bottomLeft.title}</h4>
              </div>
            </div>

            <div className="relative group cursor-pointer overflow-hidden border-2 border-black">
              <img
                alt={bottomRight.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={bottomRight.img}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-base">
                <h4 className="text-white text-sm font-bold uppercase">{bottomRight.title}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

