const { User } = require('../models/user')
const { createToken } = require('../utils/jwt')
const asyncHandler = require('express-async-handler')
const { AppError } = require('../utils/AppError')
const { check } = require('express-validator')

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user) throw new AppError('Email o Contraseña son incorrectos', 400)

  const equalPass = await user.comparePassword(password)
  if (!equalPass) throw new AppError('Email o Contraseña son incorrectos', 400)

  // token jwt or passport dependencie
  const token = await createToken(user)
  user.password = ''
  res.status(200).json({ user, token })
})

const register = asyncHandler(async (req, res, next) => {
  const { name, email, surname, birthDate, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) throw new AppError('El Usuario ya existe', 400)

  const user = new User({
    name,
    email,
    surname,
    birthDate,
    password
  })
  await user.save()
  res.status(201).json({ message: 'Tu registro ha sido exitoso', user })
})

// Validations all routes auth
const validate = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        check('name')
          .exists()
          .withMessage('El Nombre es necesario')
          .bail()
          .isAlpha('en-US', { ignore: ' ' })
          .withMessage(
            'El Nombre no debe contener caracteres especiales o alfanuméricos'
          ),
        check('surname')
          .exists()
          .withMessage('El Apellido es necesario')
          .bail()
          .isAlpha('en-US', { ignore: ' ' })
          .withMessage(
            'El Apellido no debe contener caracteres especiales o alfanuméricos'
          ),
        check('email')
          .exists()
          .withMessage('El Email es necesario')
          .bail()
          .isEmail()
          .withMessage('El Email es invalido'),
        check('password')
          .exists()
          .withMessage('El Password es necesario')
          .bail()
          .isLength({ min: 6 })
          .withMessage('El Password debe contener un minimo de 6 caracteres'),
        check('birthDate')
          .exists()
          .withMessage('Este campo es obligatorio para el registro')
          .bail()
          .isDate()
          .withMessage(
            'La Fecha debe estar en un formato correcto, ex: 1991-10-23'
          )
      ]
    }
    case 'loginUser': {
      return [
        check('email', 'El Email no es Valido').exists().bail().isEmail(),
        check('password', 'La Contraseña no es Valida').exists()
      ]
    }
    default:
      return []
  }
}

module.exports = { login, register, validate }
