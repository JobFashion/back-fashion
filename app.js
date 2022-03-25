import express from 'express'
import { handleErrors } from './src/middleware/handleError.js'
import allRoutes from './src/routes'
const app = express()

// settings
app.set('port', process.env.PORT || 8000)

// middlewares
app.use(express.json())

// routes
app.use('/api/v1', allRoutes)

// handleErrors
app.use(handleErrors)

// export default app
module.exports = app