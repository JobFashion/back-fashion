const { Router } = require('express')

const { validateReq } = require('../middleware/validateReq')
const { login, register, validate } = require('../controllers/auth')

const router = Router()

router.post('/login', validateReq(validate('loginUser')), login)

router.post('/register', validateReq(validate('registerUser')), register)

module.exports = router
