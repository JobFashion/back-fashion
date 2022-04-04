import mongoose from 'mongoose'

export const validID = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: 400,
      message: 'Faltan Parámetros para continuar con la solicitud'
    })
  }
  next()
}
