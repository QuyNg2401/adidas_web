import express from 'express'
import {
  googleCallbackController,
  googleStartController,
  loginController,
  logoutController,
  meController,
  refreshController,
  registerController,
} from '../controllers/authController.js'

export const authRouter = express.Router()

authRouter.get('/google', googleStartController)
authRouter.get('/google/callback', googleCallbackController)

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/me', meController)
authRouter.post('/refresh', refreshController)
authRouter.post('/logout', logoutController)

