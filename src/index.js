require('dotenv').config()
const app = require('./app')
require('./dbConection')

// start server
const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

module.exports = { app, server }
