import { useMemo, useState } from 'react'
import { CartContext } from './cartContext.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const value = useMemo(() => {
    const cartCount = items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0)

    return {
      items,
      cartCount,
      addItem: (item) => {
        const qty = Math.max(1, Math.min(Number(item.quantity) || 1, 99))
        setItems((prev) => {
          const existing = prev.find((it) => it.id === item.id)
          if (existing) {
            return prev.map((it) =>
              it.id === item.id
                ? {
                    ...it,
                    quantity: Math.min(99, (Number(it.quantity) || 1) + qty),
                  }
                : it
            )
          }
          return [...prev, { ...item, quantity: qty }]
        })
      },
      setQuantity: (id, quantity) => {
        const q = Math.max(1, Math.min(Number(quantity) || 1, 99))
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: q } : it)))
      },
      remove: (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
      clear: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
