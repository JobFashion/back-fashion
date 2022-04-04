import { Router } from 'express'

import { validateReq } from '../middleware/validateReq'
import { login, register, validate } from '../controllers/auth'

const router = Router()

router.post('/login', validateReq(validate('loginUser')), login)

router.post('/register', validateReq(validate('registerUser')), register)

export default router
