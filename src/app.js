import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

import allRoutes from './routes/index.js'
import { handleErrors } from './middleware/handleError.js'

const swaggerDoc = YAML.load('./src/config/openapiDocs.yml')
const app = express()

// settings
app.set('port', process.env.PORT || 8000)

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// routes
app.use('/api/v1', allRoutes)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

// handleErrors
app.use(handleErrors)

// export default app
export default app
