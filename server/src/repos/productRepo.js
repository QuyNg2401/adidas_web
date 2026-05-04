import { pool } from '../db.js'

function clampLimit(limit, fallback = 200, max = 500) {
  return Math.max(1, Math.min(Number(limit) || fallback, max))
}

export async function searchProducts({
  q,
  categorySlug,
  minCents,
  maxCents,
  limit = 200,
} = {}) {
  const safeLimit = clampLimit(limit)

  let sql = `
    SELECT p.slug, p.name, p.meta, p.price_cents AS priceCents,
           p.image_url AS imageUrl, p.image_alt AS imageAlt,
           c.slug AS categorySlug, c.name AS categoryName
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE 1 = 1`
  const params = []

  if (q && String(q).trim()) {
    sql += ` AND (p.name LIKE ? OR p.meta LIKE ? OR p.slug LIKE ?)`
    const like = `%${String(q).trim()}%`
    params.push(like, like, like)
  }
  if (categorySlug) {
    sql += ` AND c.slug = ?`
    params.push(categorySlug)
  }
  if (minCents != null && Number.isFinite(Number(minCents))) {
    sql += ` AND p.price_cents >= ?`
    params.push(Number(minCents))
  }
  if (maxCents != null && Number.isFinite(Number(maxCents))) {
    sql += ` AND p.price_cents <= ?`
    params.push(Number(maxCents))
  }

  sql += ` ORDER BY p.id DESC LIMIT ?`
  params.push(safeLimit)

  const [rows] = await pool.query(sql, params)
  return rows
}

/** @deprecated use searchProducts */
export async function listProducts({ limit = 200 } = {}) {
  return searchProducts({ limit })
}

export async function findProductsBySlugs(slugs) {
  if (!Array.isArray(slugs) || slugs.length === 0) return []
  const unique = [...new Set(slugs)].slice(0, 500)
  const placeholders = unique.map(() => '?').join(',')
  const [rows] = await pool.query(
    `SELECT id, slug, name, meta, price_cents AS priceCents, image_url AS imageUrl, image_alt AS imageAlt
     FROM products
     WHERE slug IN (${placeholders})`,
    unique
  )
  return rows
}

export async function findProductBySlug(slug) {
  const [rows] = await pool.query(
    `SELECT p.id, p.slug, p.name, p.meta, p.price_cents AS priceCents,
            p.image_url AS imageUrl, p.image_alt AS imageAlt,
            c.slug AS categorySlug, c.name AS categoryName
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.slug = ?
     LIMIT 1`,
    [slug]
  )
  return rows[0] ?? null
}

export async function findOtherProducts({ excludeSlug, limit = 3 } = {}) {
  const safeLimit = clampLimit(limit, 3, 20)
  const [rows] = await pool.query(
    `SELECT slug, name, meta, price_cents AS priceCents,
            image_url AS imageUrl, image_alt AS imageAlt
     FROM products
     WHERE slug <> ?
     ORDER BY id DESC
     LIMIT ?`,
    [excludeSlug, safeLimit]
  )
  return rows
}

export async function adminListProducts({ limit = 200 } = {}) {
  const safeLimit = clampLimit(limit, 200, 500)
  const [rows] = await pool.query(
    `SELECT p.id, p.slug, p.name, p.meta, p.price_cents AS priceCents,
            p.image_url AS imageUrl, p.image_alt AS imageAlt,
            p.category_id AS categoryId, c.slug AS categorySlug
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ORDER BY p.id DESC
     LIMIT ?`,
    [safeLimit]
  )
  return rows
}

export async function insertProduct({
  slug,
  name,
  meta,
  priceCents,
  imageUrl,
  imageAlt,
  categoryId,
}) {
  const [result] = await pool.query(
    `INSERT INTO products (slug, name, meta, price_cents, image_url, image_alt, category_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [slug, name, meta, priceCents, imageUrl, imageAlt, categoryId ?? null]
  )
  return result.insertId
}

export async function updateProduct(id, patch) {
  const fields = []
  const vals = []
  const map = {
    slug: 'slug',
    name: 'name',
    meta: 'meta',
    priceCents: 'price_cents',
    imageUrl: 'image_url',
    imageAlt: 'image_alt',
    categoryId: 'category_id',
  }
  for (const [key, col] of Object.entries(map)) {
    if (patch[key] !== undefined) {
      fields.push(`${col} = ?`)
      vals.push(patch[key])
    }
  }
  if (!fields.length) return
  vals.push(id)
  await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = ?', [id])
}
