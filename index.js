import 'dotenv/config'
import app from './src/app.js'
import './src/dbConection.js'

// start server
const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

export { app, server }
