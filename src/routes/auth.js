import { Router } from 'express'

import * as authController from '../controllers/auth'
import { validateReq } from '../middleware/validateReq'

const router = Router()

// -> auth
router.post(
  '/login',
  validateReq(authController.validate('loginUser')),
  authController.login
)

router.post(
  '/register',
  validateReq(authController.validate('registerUser')),
  authController.register
)

export default router
