const { Router } = require('express')

const authRoute = require('./auth')
const userRoute = require('./user')

const router = Router()

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute }
]

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

module.exports = router
