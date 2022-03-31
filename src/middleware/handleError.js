export const handleErrors = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'invalid token...' })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'invalid id...' })
  }

  // default to 500 server error
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message
  })
}
