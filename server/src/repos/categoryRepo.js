import { pool } from '../db.js'

export async function listCategories() {
  const [rows] = await pool.query(
    'SELECT id, slug, name FROM categories ORDER BY name ASC'
  )
  return rows
}

export async function createCategory({ slug, name }) {
  const [result] = await pool.query(
    'INSERT INTO categories (slug, name) VALUES (?, ?)',
    [slug, name]
  )
  return { id: result.insertId, slug, name }
}

export async function updateCategory(id, { slug, name }) {
  await pool.query('UPDATE categories SET slug = ?, name = ? WHERE id = ?', [
    slug,
    name,
    id,
  ])
}

export async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE id = ?', [id])
}
