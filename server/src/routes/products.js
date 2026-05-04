import express from 'express'
import {
  createProductReviewController,
  getProductDetailController,
  listProductsController,
} from '../controllers/productController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

export const productsRouter = express.Router()

productsRouter.get('/', listProductsController)
productsRouter.post('/:slug/reviews', requireAuth, createProductReviewController)
productsRouter.get('/:slug', getProductDetailController)
