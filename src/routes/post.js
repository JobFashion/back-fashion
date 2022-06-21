import { Router } from 'express'
import { validJWT } from '../middleware/validJWT.js'
import { validateOwner } from '../middleware/validateOwner.js'
import * as postController from '../controllers/post.js'
import { validID } from '../middleware/validID.js'

const router = Router()

// router.patch('/savePost/:id', validJWT, postController.savePost)
// router.patch('/unSavePost/:id', validJWT, postController.unSavePost)
router.get('/getSavePosts', validJWT, postController.getSavePosts)
router.get('/search', validJWT, postController.getPostsSearch)
router.get('/discover', validJWT, postController.getPostsDiscover)
router.get('/', validJWT, postController.getPosts)
router.post('/', validJWT, postController.createPost)

router.get('/:id', validJWT, postController.getOnePost)

router.patch(
  '/:id',
  validJWT,
  validID,
  validateOwner('Posts'),
  postController.updatePost
)
router.delete(
  '/:id',
  validJWT,
  validID,
  validateOwner,
  postController.deletePost
)

router.patch('/:id/like', validJWT, postController.likePost)
router.patch('/:id/unlike', validJWT, postController.unLikePost)

router.get('/user/:id', validJWT, postController.getUserPosts)

export default router
