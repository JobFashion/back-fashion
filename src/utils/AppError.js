'use strict'

function AppError(message, code) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
  this.statusCode = code
}

module.exports = AppError
