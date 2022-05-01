import { Router } from 'express'

import { validateReq } from '../middleware/validateReq.js'
import { login, register, validate } from '../controllers/auth.js'

const router = Router()

router.post('/login', validateReq(validate('loginUser')), login)
router.post('/register', validateReq(validate('registerUser')), register)

export default router
