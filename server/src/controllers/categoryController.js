import { listCategories } from '../repos/categoryRepo.js'

export async function listCategoriesController(_req, res) {
  try {
    const items = await listCategories()
    return res.json({ items })
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to load categories' })
  }
}
