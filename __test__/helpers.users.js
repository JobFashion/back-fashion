const supertest = require('supertest')
const { app } = require('../index')

module.exports.api = supertest(app)

module.exports.initialUser = [
  {
    name: 'Pedro',
    email: 'Pedor@gmail.com',
    perfilURL: 'estaeslaurldeunafotodeperfil'
  },
  {
    name: 'Maria',
    email: 'Maria@gmail.com',
    perfilURL: 'estaeslaurldeunafotodeperfil'
  }
]
