import { User } from '../models/user'
import validEmail from '../utils'
import { createToken } from '../utils/jwt'

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Email or Password incorrect')

    const equalPass = await user.comparePassword(password)
    if (!equalPass) throw new Error('Email or Password incorrect')

    // token jwt or passport dependencie
    const token = await createToken(user)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  // const { name, email, perfilURL } = req.body
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
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(401).json({ error: 'User already exists', userExist })
    }
    const user = await new User({
      name,
      email,
      perfilURL,
      surname,
      birthDate,
      password
    })
    await user.save() // save user in DB
    res.status(201).json(user)
  } catch (error) {
    next(error)
    // console.log(error.message)
  }
}

export { login, register }
