const { validationResult } = require('express-validator')

// parallel processing
module.exports.validateReq = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ status: 400, errors: errors.array() })
  }
}
