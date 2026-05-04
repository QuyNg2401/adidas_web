import {
  adminCategories,
  adminCreateCategory,
  adminCreateProduct,
  adminOrdersList,
  adminPatchOrderStatus,
  adminPatchProduct,
  adminProductsList,
  adminRemoveCategory,
  adminRemoveProduct,
  adminStats,
  adminUpdateCategory,
} from '../services/adminService.js'

export async function adminStatsController(_req, res) {
  try {
    const stats = await adminStats()
    return res.json({ stats })
  } catch (err) {
    return res.status(500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminCategoriesController(_req, res) {
  try {
    const items = await adminCategories()
    return res.json({ items })
  } catch (err) {
    return res.status(500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminCreateCategoryController(req, res) {
  try {
    const cat = await adminCreateCategory(req.body ?? {})
    return res.status(201).json({ category: cat })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminUpdateCategoryController(req, res) {
  try {
    await adminUpdateCategory(req.params.id, req.body ?? {})
    return res.json({ ok: true })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminDeleteCategoryController(req, res) {
  try {
    await adminRemoveCategory(req.params.id)
    return res.json({ ok: true })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminProductsController(_req, res) {
  try {
    const items = await adminProductsList()
    return res.json({ items })
  } catch (err) {
    return res.status(500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminCreateProductController(req, res) {
  try {
    const result = await adminCreateProduct(req.body ?? {})
    return res.status(201).json(result)
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminPatchProductController(req, res) {
  try {
    await adminPatchProduct(req.params.id, req.body ?? {})
    return res.json({ ok: true })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminDeleteProductController(req, res) {
  try {
    await adminRemoveProduct(req.params.id)
    return res.json({ ok: true })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminOrdersController(_req, res) {
  try {
    const items = await adminOrdersList()
    return res.json({ items })
  } catch (err) {
    return res.status(500).json({ error: err.message ?? 'Server error' })
  }
}

export async function adminPatchOrderController(req, res) {
  try {
    await adminPatchOrderStatus(req.params.id, req.body ?? {})
    return res.json({ ok: true })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}
