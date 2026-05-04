import express from 'express'
import { listCategoriesController } from '../controllers/categoryController.js'

export const categoriesRouter = express.Router()

categoriesRouter.get('/', listCategoriesController)
