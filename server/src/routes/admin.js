import express from 'express'
import {
  adminCategoriesController,
  adminCreateCategoryController,
  adminCreateProductController,
  adminDeleteCategoryController,
  adminDeleteProductController,
  adminOrdersController,
  adminPatchOrderController,
  adminPatchProductController,
  adminProductsController,
  adminStatsController,
  adminUpdateCategoryController,
} from '../controllers/adminController.js'
import { requireAdmin, requireAuth } from '../middlewares/authMiddleware.js'

export const adminRouter = express.Router()

adminRouter.use(requireAuth, requireAdmin)

adminRouter.get('/stats', adminStatsController)

adminRouter.get('/categories', adminCategoriesController)
adminRouter.post('/categories', adminCreateCategoryController)
adminRouter.patch('/categories/:id', adminUpdateCategoryController)
adminRouter.delete('/categories/:id', adminDeleteCategoryController)

adminRouter.get('/products', adminProductsController)
adminRouter.post('/products', adminCreateProductController)
adminRouter.patch('/products/:id', adminPatchProductController)
adminRouter.delete('/products/:id', adminDeleteProductController)

adminRouter.get('/orders', adminOrdersController)
adminRouter.patch('/orders/:id', adminPatchOrderController)
