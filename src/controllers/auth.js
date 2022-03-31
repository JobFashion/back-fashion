import { User } from '../models/user'
import validEmail from '../utils'
import { createToken } from '../utils/jwt'
import asyncHandler from 'express-async-handler'

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new Error('Email or Password incorrect')

  const equalPass = await user.comparePassword(password)
  if (!equalPass) throw new Error('Email or Password incorrect')

  // token jwt or passport dependencie
  const token = await createToken(user)

  res.status(200).json({ user, token })
})

// TODO: check all validation external
const register = asyncHandler(async (req, res, next) => {
  const { name, email, perfilURL, surname, birthDate, password } = req.body

  const isValidEmail = validEmail(email)
  if (
    !name ||
    !email ||
    !perfilURL ||
    !isValidEmail ||
    !surname ||
    !birthDate
  ) {
    throw new Error('Missing fields')
  }

  const userExist = await User.findOne({ email })
  if (userExist) throw new Error('User already exists') // 401

  const user = new User({
    name,
    email,
    perfilURL,
    surname,
    birthDate,
    password
  })
  await user.save()

  res.status(201).json({ msg: 'Registered Successfully', user })
})

export { login, register }
