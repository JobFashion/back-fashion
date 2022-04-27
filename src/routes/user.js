const { Router } = require('express')

// controllers
const userController = require('../controllers/user')
// middlewares
const { validJWT } = require('../middleware/validJWT')
const { validID } = require('../middleware/validID')

const router = Router()

// -> users
router.get('/', userController.getAllUsers)
router.get('/:email', userController.getUserByEmail)
router.put('/:id', validJWT, validID, userController.updateUserById)
router.delete('/:id', validJWT, validID, userController.deleteUserById)

module.exports = router
