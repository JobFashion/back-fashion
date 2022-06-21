import { Router } from 'express'
import { validJWT } from '../middleware/validJWT.js'
import * as commentController from '../controllers/comment.js'

const router = Router()

router.get('/', validJWT, commentController.getAllComments) // only admin
router.post('/', validJWT, commentController.createComment)
router.patch('/:id', validJWT, commentController.updateComment)
router.patch('/:id/like', validJWT, commentController.likeComment)
router.patch('/:id/unlike', validJWT, commentController.unLikeComment)
router.delete('/:id', validJWT, commentController.deleteComment)

export default router
