import { z } from 'zod'
import {
  aggregateRatingForProductSlug,
  createReview,
  listReviewsByProductSlug,
} from '../repos/reviewRepo.js'
import { findProductBySlug } from '../repos/productRepo.js'

const CreateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(2000),
})

export async function listReviewsForSlug(slug) {
  const reviews = await listReviewsByProductSlug(slug)
  const agg = await aggregateRatingForProductSlug(slug)
  return { reviews, avgRating: agg.avgRating, reviewCount: agg.reviewCount }
}

export async function createReviewForSlug({ slug, userId, payload }) {
  const product = await findProductBySlug(slug)
  if (!product) {
    const err = new Error('Product not found')
    err.statusCode = 404
    throw err
  }
  const data = CreateReviewSchema.parse(payload ?? {})
  await createReview({
    productId: product.id,
    userId,
    rating: data.rating,
    comment: data.comment,
  })
  return listReviewsForSlug(slug)
}
