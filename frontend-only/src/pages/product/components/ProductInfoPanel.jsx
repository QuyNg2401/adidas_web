import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'

export function ProductInfoPanel({ product }) {
  const nav = useNavigate()
  const { addItem } = useCart()

  function onAddToBag() {
    const img = product.gallery?.[0]
    addItem({
      id: product.slug,
      name: product.name,
      price: String(product.price ?? '').replace(/\s*USD\s*/i, '').trim(),
      quantity: 1,
      image: img ? { src: img.src, alt: img.alt } : undefined,
    })
    nav('/cart')
  }
  return (
    <aside className="col-span-12 lg:col-span-4 flex flex-col gap-xl">
      <div className="sticky top-28">
        <div className="border-b border-black pb-lg mb-lg">
          <span className="text-label-bold uppercase text-secondary mb-xs block">
            {product.breadcrumb}
          </span>
          <h1 className="text-headline-lg uppercase mb-xs">{product.name}</h1>
          <p className="text-headline-sm">{product.price}</p>
        </div>

        <div className="mb-xl">
          <div className="flex justify-between items-end mb-md">
            <span className="text-label-bold uppercase">SELECT SIZE</span>
            <button className="text-label-md underline" type="button">
              SIZE GUIDE
            </button>
          </div>

          <div className="grid grid-cols-4 gap-xs">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                type="button"
                disabled={!s.enabled}
                className={
                  !s.enabled
                    ? 'border border-outline-variant py-md text-label-bold text-outline-variant cursor-not-allowed'
                    : s.selected
                      ? 'border border-black py-md text-label-bold bg-black text-white'
                      : 'border border-black py-md text-label-bold hover:bg-black hover:text-white transition-colors'
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onAddToBag}
          className="w-full bg-black text-white py-lg text-headline-sm uppercase hover:opacity-90 active:scale-[0.98] transition-all mb-lg"
        >
          ADD TO BAG
        </button>

        <div className="flex flex-col border-t border-black">
          {product.accordions.map((a) => (
            <details
              key={a.title}
              className="group border-b border-black"
              open={a.open || undefined}
            >
              <summary className="flex justify-between items-center py-lg cursor-pointer list-none text-label-bold uppercase">
                {a.title}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>

              {a.paragraphs ? (
                <div className="pb-lg text-body-sm text-on-surface-variant flex flex-col gap-md">
                  {a.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              ) : null}

              {a.kv ? (
                <div className="pb-lg text-body-sm text-on-surface-variant space-y-2">
                  {a.kv.map((row) => (
                    <div key={row.k} className="flex justify-between">
                      <span className="font-bold">{row.k}</span> <span>{row.v}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {a.text ? (
                <div className="pb-lg text-body-sm text-on-surface-variant">
                  {a.text}
                </div>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </aside>
  )
}

