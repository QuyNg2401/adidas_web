import { pool } from '../db.js'

export async function createOrderTx({ userId, items, totalCents }) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, status, total_cents) VALUES (?, ?, ?)',
      [userId, 'pending', totalCents]
    )
    const orderId = orderResult.insertId

    for (const it of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents) VALUES (?, ?, ?, ?)',
        [orderId, it.productId, it.quantity, it.unitPriceCents]
      )
    }

    await conn.commit()
    return orderId
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

export async function listOrdersByUserId(userId) {
  const [rows] = await pool.query(
    `SELECT id, status, total_cents AS totalCents, created_at AS createdAt
     FROM orders
     WHERE user_id = ?
     ORDER BY id DESC
     LIMIT 100`,
    [userId]
  )
  return rows
}

export async function listOrdersAdmin({ limit = 200 } = {}) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 200, 500))
  const [rows] = await pool.query(
    `SELECT o.id, o.status, o.total_cents AS totalCents, o.created_at AS createdAt,
            u.email AS userEmail, u.full_name AS userFullName
     FROM orders o
     JOIN users u ON u.id = o.user_id
     ORDER BY o.id DESC
     LIMIT ?`,
    [safeLimit]
  )
  return rows
}

export async function updateOrderStatus(orderId, status) {
  await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId])
}

export async function aggregateDashboardStats() {
  const [[rev]] = await pool.query(
    `SELECT COALESCE(SUM(total_cents), 0) AS revenueCents
     FROM orders
     WHERE status IN ('paid','shipped','delivered')`
  )
  const [[ord]] = await pool.query(`SELECT COUNT(*) AS c FROM orders`)
  const [[pend]] = await pool.query(
    `SELECT COUNT(*) AS c FROM orders WHERE status = 'pending'`
  )
  const [[pc]] = await pool.query(`SELECT COUNT(*) AS c FROM products`)
  const [[cc]] = await pool.query(`SELECT COUNT(*) AS c FROM categories`)

  const [statusRows] = await pool.query(
    `SELECT status, COUNT(*) AS c FROM orders GROUP BY status ORDER BY status ASC`
  )
  const ordersByStatus = {}
  for (const row of statusRows) {
    ordersByStatus[row.status] = Number(row.c ?? 0)
  }

  return {
    revenueCents: Number(rev?.revenueCents ?? 0),
    ordersTotal: Number(ord?.c ?? 0),
    ordersPending: Number(pend?.c ?? 0),
    productsTotal: Number(pc?.c ?? 0),
    categoriesTotal: Number(cc?.c ?? 0),
    ordersByStatus,
  }
}

export async function getOrderWithItems({ orderId, userId }) {
  const [orders] = await pool.query(
    `SELECT id, user_id AS userId, status, total_cents AS totalCents, created_at AS createdAt
     FROM orders
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [orderId, userId]
  )
  const order = orders[0]
  if (!order) return null

  const [items] = await pool.query(
    `SELECT oi.quantity, oi.unit_price_cents AS unitPriceCents,
            p.slug, p.name, p.image_url AS imageUrl, p.image_alt AS imageAlt
     FROM order_items oi
     JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?
     ORDER BY oi.id ASC`,
    [orderId]
  )

  return { ...order, items }
}

