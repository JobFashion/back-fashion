import { Router } from 'express'

import * as authController from '../controllers/auth'

const router = Router()

// -> auth
router.post('/login', authController.login)
router.post('/register', authController.register)

export default router
