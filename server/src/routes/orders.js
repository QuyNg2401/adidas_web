import express from 'express'
import {
  createOrderController,
  getMyOrderController,
  listMyOrdersController,
} from '../controllers/orderController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

export const ordersRouter = express.Router()

ordersRouter.post('/', requireAuth, createOrderController)
ordersRouter.get('/my', requireAuth, listMyOrdersController)
ordersRouter.get('/my/:id', requireAuth, getMyOrderController)

