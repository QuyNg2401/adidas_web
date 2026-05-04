import { Link } from 'react-router-dom'

export function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.slug}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-variant border border-black transition-all group-hover:border-4">
        <img
          alt={product.alt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          src={product.img}
        />
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-black">
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full py-2 bg-white text-black text-label-bold uppercase"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="mt-md space-y-xs">
        <h3 className="text-body-lg uppercase">{product.name}</h3>
        <p className="text-label-md text-secondary">{product.meta}</p>
        <p className="text-body-lg">{product.price}</p>
      </div>
    </Link>
  )
}

