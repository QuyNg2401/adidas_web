import { z } from 'zod'
import {
  searchProducts,
  findProductBySlug,
  findOtherProducts,
} from '../repos/productRepo.js'
import {
  aggregateRatingForProductSlug,
  listReviewsByProductSlug,
} from '../repos/reviewRepo.js'

const ProductRowSchema = z.object({
  slug: z.string(),
  name: z.string(),
  meta: z.string(),
  priceCents: z.number().int(),
  imageUrl: z.string(),
  imageAlt: z.string(),
  categorySlug: z.string().nullable().optional(),
  categoryName: z.string().nullable().optional(),
})

export async function getProductsFromQuery(query = {}) {
  const limit = query.limit ? Number(query.limit) : 200
  const q = query.q ?? query.search ?? ''
  const categorySlug = query.category ?? query.categorySlug ?? ''

  let minCents
  let maxCents
  if (query.minPrice !== undefined && query.minPrice !== '') {
    const n = Number(query.minPrice)
    if (Number.isFinite(n)) minCents = Math.round(n * 100)
  }
  if (query.maxPrice !== undefined && query.maxPrice !== '') {
    const n = Number(query.maxPrice)
    if (Number.isFinite(n)) maxCents = Math.round(n * 100)
  }

  const rows = await searchProducts({
    q: q || undefined,
    categorySlug: categorySlug || undefined,
    minCents,
    maxCents,
    limit,
  })

  const parsed = z.array(ProductRowSchema).safeParse(rows)
  if (!parsed.success) {
    const err = new Error('Invalid products shape from DB')
    err.cause = parsed.error
    throw err
  }
  return parsed.data
}

export async function getProductDetail(slug) {
  const product = await findProductBySlug(slug)
  if (!product) {
    const err = new Error('Not found')
    err.statusCode = 404
    throw err
  }

  const [reviews, agg, related] = await Promise.all([
    listReviewsByProductSlug(slug),
    aggregateRatingForProductSlug(slug),
    findOtherProducts({ excludeSlug: slug, limit: 3 }),
  ])

  return {
    product,
    reviews,
    avgRating: agg.avgRating,
    reviewCount: agg.reviewCount,
    related,
  }
}
