import { z } from 'zod'
import { findProductsBySlugs } from '../repos/productRepo.js'
import { createOrderTx, getOrderWithItems, listOrdersByUserId } from '../repos/orderRepo.js'

const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1)
    .max(50),
})

export async function createOrder({ userId, payload }) {
  const data = CreateOrderSchema.parse(payload)
  const slugs = data.items.map((i) => i.slug)
  const products = await findProductsBySlugs(slugs)

  const bySlug = new Map(products.map((p) => [p.slug, p]))
  const normalized = []

  for (const it of data.items) {
    const p = bySlug.get(it.slug)
    if (!p) {
      const err = new Error(`Product not found: ${it.slug}`)
      err.statusCode = 400
      throw err
    }
    normalized.push({
      productId: p.id,
      quantity: it.quantity,
      unitPriceCents: p.priceCents,
    })
  }

  const totalCents = normalized.reduce(
    (sum, it) => sum + it.unitPriceCents * it.quantity,
    0
  )

  const orderId = await createOrderTx({ userId, items: normalized, totalCents })
  return { orderId }
}

export async function listMyOrders({ userId }) {
  return listOrdersByUserId(userId)
}

export async function getMyOrder({ userId, orderId }) {
  const id = Number(orderId)
  if (!Number.isFinite(id) || id <= 0) {
    const err = new Error('Invalid order id')
    err.statusCode = 400
    throw err
  }
  return getOrderWithItems({ userId, orderId: id })
}

