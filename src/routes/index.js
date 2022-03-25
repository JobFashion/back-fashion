import { Router } from 'express'

import authRoute from './auth'
import userRoute from './user'

const router = Router()

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute }
]

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

export default router
