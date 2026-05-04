import { z } from 'zod'
import {
  adminListProducts,
  deleteProduct,
  insertProduct,
  updateProduct,
} from '../repos/productRepo.js'
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from '../repos/categoryRepo.js'
import {
  aggregateDashboardStats,
  listOrdersAdmin,
  updateOrderStatus,
} from '../repos/orderRepo.js'

const CategorySchema = z.object({
  slug: z.string().min(1).max(191),
  name: z.string().min(1).max(255),
})

const ProductCreateSchema = z.object({
  slug: z.string().min(1).max(191),
  name: z.string().min(1).max(255),
  meta: z.string().min(1).max(255),
  priceCents: z.number().int().positive(),
  imageUrl: z.string().url(),
  imageAlt: z.string().min(1).max(255),
  categoryId: z.number().int().positive().nullable().optional(),
})

const ProductPatchSchema = z
  .object({
    slug: z.string().min(1).max(191).optional(),
    name: z.string().min(1).max(255).optional(),
    meta: z.string().min(1).max(255).optional(),
    priceCents: z.number().int().positive().optional(),
    imageUrl: z.string().url().optional(),
    imageAlt: z.string().min(1).max(255).optional(),
    categoryId: z.union([z.number().int().positive(), z.null()]).optional(),
  })
  .strict()

const OrderStatusSchema = z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])

export async function adminStats() {
  return aggregateDashboardStats()
}

export async function adminCategories() {
  return listCategories()
}

export async function adminCreateCategory(body) {
  const data = CategorySchema.parse(body ?? {})
  return createCategory(data)
}

export async function adminUpdateCategory(id, body) {
  const categoryId = Number(id)
  if (!categoryId) {
    const err = new Error('Invalid category id')
    err.statusCode = 400
    throw err
  }
  const data = CategorySchema.parse(body ?? {})
  await updateCategory(categoryId, data)
  return { ok: true }
}

export async function adminRemoveCategory(id) {
  const categoryId = Number(id)
  if (!categoryId) {
    const err = new Error('Invalid category id')
    err.statusCode = 400
    throw err
  }
  await deleteCategory(categoryId)
  return { ok: true }
}

export async function adminProductsList() {
  return adminListProducts({ limit: 500 })
}

export async function adminCreateProduct(body) {
  const data = ProductCreateSchema.parse(body ?? {})
  const insertId = await insertProduct({
    slug: data.slug,
    name: data.name,
    meta: data.meta,
    priceCents: data.priceCents,
    imageUrl: data.imageUrl,
    imageAlt: data.imageAlt,
    categoryId: data.categoryId ?? null,
  })
  return { id: insertId }
}

export async function adminPatchProduct(id, body) {
  const pid = Number(id)
  if (!pid) {
    const err = new Error('Invalid product id')
    err.statusCode = 400
    throw err
  }
  const data = ProductPatchSchema.parse(body ?? {})
  const patch = {}
  if (data.slug !== undefined) patch.slug = data.slug
  if (data.name !== undefined) patch.name = data.name
  if (data.meta !== undefined) patch.meta = data.meta
  if (data.priceCents !== undefined) patch.priceCents = data.priceCents
  if (data.imageUrl !== undefined) patch.imageUrl = data.imageUrl
  if (data.imageAlt !== undefined) patch.imageAlt = data.imageAlt
  if (data.categoryId !== undefined) patch.categoryId = data.categoryId
  await updateProduct(pid, patch)
  return { ok: true }
}

export async function adminRemoveProduct(id) {
  const pid = Number(id)
  if (!pid) {
    const err = new Error('Invalid product id')
    err.statusCode = 400
    throw err
  }
  await deleteProduct(pid)
  return { ok: true }
}

export async function adminOrdersList() {
  return listOrdersAdmin({ limit: 300 })
}

export async function adminPatchOrderStatus(id, body) {
  const oid = Number(id)
  if (!oid) {
    const err = new Error('Invalid order id')
    err.statusCode = 400
    throw err
  }
  const status = OrderStatusSchema.parse(body?.status)
  await updateOrderStatus(oid, status)
  return { ok: true }
}
