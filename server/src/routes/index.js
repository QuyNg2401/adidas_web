import express from 'express'
import { authRouter } from './auth.js'
import { productsRouter } from './products.js'
import { ordersRouter } from './orders.js'
import { categoriesRouter } from './categories.js'
import { adminRouter } from './admin.js'

export const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/admin', adminRouter)

