import { User } from '../models/user.js'
import { verifyToken } from '../utils/jwt.js'

export const validJWT = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    const token = auth?.replace('Bearer ', '')
    if (!token) {
      return res.status(403).send({
        data: [],
        status: 403,
        error: 'InvalidToken!',
        message: 'imposible procesar la solicitud'
      })
    }
    const store = await verifyToken(token)
    const user = await User.findOne({ _id: store.id })
    req.user = user
    next()
  } catch (error) {
    return res.status(401).send({
      data: [],
      message: 'Tus sesión ha expirado, volvé a ingresar',
      error: 'Unauthorized! ' + error,
      status: 401
    })
  }
}
