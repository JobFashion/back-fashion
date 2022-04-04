import { model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
// import crypto from 'crypto'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    birthDate: { type: Date, required: true },
    perfilURL: { type: String, required: false }
    // verificationToken: {type: String, default: () => crypto.randomBytes(24).toString('hex')}
  },
  {
    timestamps: true,
    versionKey: false
  }
)

async function generateHash(pass) {
  const salt = await bcrypt.genSalt(12)
  return await bcrypt.hash(pass, salt)
}

// al guardar hashear el password
userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash
        return next()
      })
      .catch((error) => {
        return next(error)
      })
  }
  return next()
})

// metodo agregado al modelo para comparar password
userSchema.methods.comparePassword = async function (bodyPassword) {
  return bcrypt.compare(bodyPassword, this.password)
}

export const User = model('User', userSchema)
