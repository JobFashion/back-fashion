import { Router } from 'express'

import authRoute from './auth.js'
import userRoute from './user.js'

const router = Router()

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute }
]

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

export default router
