import { Router } from 'express'

import authRoute from './auth.js'
import userRoute from './user.js'
import postRoute from './post.js'
import commentRoute from './comment.js'
import notifyRoute from './notify.js'

const router = Router()

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/posts', route: postRoute },
  { path: '/comments', route: commentRoute },
  { path: '/notifies', route: notifyRoute }
]

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

export default router
