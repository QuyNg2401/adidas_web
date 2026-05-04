import { createReviewForSlug } from '../services/reviewService.js'
import { getProductDetail, getProductsFromQuery } from '../services/productService.js'

export async function listProductsController(req, res) {
  try {
    const items = await getProductsFromQuery(req.query ?? {})
    return res.json({ items })
  } catch (_err) {
    return res.status(500).json({
      error:
        'DB query failed. Nếu bạn dùng XAMPP, hãy bật MySQL và chạy server/sql/init.sql để tạo DB + bảng.',
    })
  }
}

export async function getProductDetailController(req, res) {
  try {
    const payload = await getProductDetail(req.params.slug)
    return res.json(payload)
  } catch (err) {
    const code = err.statusCode ?? 500
    return res.status(code).json({
      error:
        code === 404
          ? 'Product not found'
          : err.message ?? 'Server error',
    })
  }
}

export async function createProductReviewController(req, res) {
  try {
    const userId = Number(req.user?.sub)
    const updated = await createReviewForSlug({
      slug: req.params.slug,
      userId,
      payload: req.body ?? {},
    })
    return res.status(201).json(updated)
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({
      error: err.message ?? 'Server error',
    })
  }
}
