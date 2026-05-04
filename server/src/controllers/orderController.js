import { createOrder, getMyOrder, listMyOrders } from '../services/orderService.js'

export async function createOrderController(req, res) {
  try {
    const userId = Number(req.user?.sub)
    const result = await createOrder({ userId, payload: req.body ?? {} })
    return res.status(201).json(result)
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function listMyOrdersController(req, res) {
  try {
    const userId = Number(req.user?.sub)
    const items = await listMyOrders({ userId })
    return res.json({ items })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

export async function getMyOrderController(req, res) {
  try {
    const userId = Number(req.user?.sub)
    const order = await getMyOrder({ userId, orderId: req.params.id })
    if (!order) return res.status(404).json({ error: 'Not found' })
    return res.json({ order })
  } catch (err) {
    return res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Server error' })
  }
}

