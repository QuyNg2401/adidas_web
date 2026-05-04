export function CartItem({ item }) {
  return (
    <div className="border-2 border-black p-lg bg-white flex flex-col sm:flex-row gap-lg items-start">
      <div className="w-full sm:w-48 aspect-square bg-surface-container overflow-hidden border border-black/10">
        <img
          alt={item.image.alt}
          className="w-full h-full object-cover grayscale"
          src={item.image.src}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-headline-sm uppercase">{item.name}</h2>
            <p className="text-body-sm text-secondary uppercase">{item.variant}</p>
            <p className="text-label-bold mt-xs">SIZE: {item.size}</p>
          </div>
          <span className="text-headline-sm">{item.price}</span>
        </div>

        <div className="flex justify-between items-end mt-lg">
          <div className="flex items-center border border-black h-10">
            <button
              type="button"
              className="px-3 hover:bg-black hover:text-white transition-colors h-full flex items-center"
            >
              <span className="material-symbols-outlined text-base">remove</span>
            </button>
            <span className="px-4 font-bold border-x border-black h-full flex items-center">
              {item.quantity}
            </span>
            <button
              type="button"
              className="px-3 hover:bg-black hover:text-white transition-colors h-full flex items-center"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>

          <button
            type="button"
            className="text-zinc-400 hover:text-black transition-colors flex items-center gap-xs text-label-bold"
          >
            <span className="material-symbols-outlined text-sm">delete</span> REMOVE
          </button>
        </div>
      </div>
    </div>
  )
}

