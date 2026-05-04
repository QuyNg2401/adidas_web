import { pool } from '../db.js'

export async function listReviewsByProductSlug(slug, { limit = 50 } = {}) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 50, 100))
  const [rows] = await pool.query(
    `SELECT r.id, r.rating, r.comment, r.created_at AS createdAt,
            u.full_name AS authorName
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     JOIN products p ON p.id = r.product_id
     WHERE p.slug = ?
     ORDER BY r.id DESC
     LIMIT ?`,
    [slug, safeLimit]
  )
  return rows
}

export async function aggregateRatingForProductSlug(slug) {
  const [rows] = await pool.query(
    `SELECT AVG(r.rating) AS avgRating, COUNT(*) AS reviewCount
     FROM reviews r
     JOIN products p ON p.id = r.product_id
     WHERE p.slug = ?`,
    [slug]
  )
  const row = rows[0] ?? {}
  return {
    avgRating: row.avgRating != null ? Number(row.avgRating) : null,
    reviewCount: Number(row.reviewCount ?? 0),
  }
}

export async function createReview({ productId, userId, rating, comment }) {
  const [result] = await pool.query(
    'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
    [productId, userId, rating, comment]
  )
  return result.insertId
}
