const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')

const allRoutes = require('./routes')
const { handleErrors } = require('./middleware/handleError.js')

const swaggerDoc = YAML.load('./src/config/openapiDocs.yml')
const app = express()

// settings
app.set('port', process.env.PORT || 8000)

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use('/api/v1', allRoutes)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

// handleErrors
app.use(handleErrors)

// export default app
module.exports = app
