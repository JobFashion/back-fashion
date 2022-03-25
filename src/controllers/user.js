import { User } from '../models/user'
import validEmail from '../utils'

const getAllUsers = async (req, res, next) => {
  const allUsers = await User.find({})
  if (!allUsers.length) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(allUsers)
}

const getUserByEmail = async (req, res, next) => {
  const { email } = req.params
  const isValidEmail = validEmail(email)

  if (!email || !isValidEmail) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) res.status(404).json({ message: 'User not found' })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    // TODO: `data` guarda todo lo que enviemos, arreglar con `save()` o creando un nuevo objeto

    const user = await User.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true
    })

    return !user
      ? next(new Error('Ocurrio un error al procesar la solicitud'))
      : res.status(200).send({ message: 'Actualizado', user })
  } catch (error) {
    return next(error)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    return !user
      ? next(new Error('No se encontraron resultados'))
      : res.status(200).send({ data: user })
  } catch (error) {
    next(error)
  }
}

export { getAllUsers, getUserByEmail, updateUserById, deleteUserById }
