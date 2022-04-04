// import { AppError } from '../utils/AppError'

export const handleErrors = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500
  // if (err instanceof AppError) {
  // if (err.name === 'UnauthorizedError') {
  //   return res.status(401).json({ message: 'invalid token...' })
  // }
  // if (err.name === 'CastError') {
  //   return res.status(400).json({ message: 'invalid id...' })
  // }

  return res.status(err.statusCode).json({
    name: err.name,
    status: err.statusCode,
    message: err.message
  })
}
