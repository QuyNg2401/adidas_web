import { createContext, useContext, useMemo, useState } from 'react'
import { CART_ITEMS } from '../pages/cart/cartData'

const CartContext = createContext(null)

function toCartItem(raw) {
  return {
    id: raw.id, // dùng như slug để tạo order
    name: raw.name,
    price: raw.price,
    quantity: raw.quantity ?? 1,
    image: raw.image,
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => CART_ITEMS.map(toCartItem))

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

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

