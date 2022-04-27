const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

function createToken({ id, email }, expiresIn = 60 * 60) {
  return new Promise((resolve, reject) => {
    if (!id || !email) {
      reject(new Error('datos invalidos'))
      return
    }
    jwt.sign(
      { id, email },
      JWT_SECRET,
      {
        // algorithm: 'RS256', // 2024bit
        expiresIn
      },
      (err, token) => {
        if (err) {
          reject(new Error('token invalido'))
          return
        }
        resolve(token)
      }
    )
  })
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('token invalido'))
      return
    }
    jwt.verify(
      token,
      JWT_SECRET,
      {
        // algorithm: 'RS256', // 2024bit
      },
      (err, decode) => {
        if (err) {
          reject(new Error('token invalido'))
          return
        }
        resolve(decode)
      }
    )
  })
}

module.exports = { createToken, verifyToken }
