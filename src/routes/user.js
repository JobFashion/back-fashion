import { Router } from 'express'

// controllers
import * as userController from '../controllers/user.js'
// middlewares
import { validJWT } from '../middleware/validJWT.js'
import { validID } from '../middleware/validID.js'

const router = Router()

// -> users
router.get('/', userController.getAllUsers)
router.get('/:email', userController.getUserByEmail)
router.put('/:id', validJWT, validID, userController.updateUserById)
router.delete('/:id', validJWT, validID, userController.deleteUserById)

export default router
