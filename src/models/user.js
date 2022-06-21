import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const { model, Schema, Types } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    surname: { type: String, trim: true, required: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    birthDate: { type: Date, required: true },
    perfilURL: { type: String, required: false },
    role: { type: String, enum: ['user', 'manager', 'admin'], default: 'user' },
    avatar: { type: String, required: false },
    verificationToken: { type: String, default: () => crypto.randomBytes(24).toString('hex') },
    following: [{ type: Types.ObjectId, ref: 'user' }]
    // saved: [{type: mongoose.Types.ObjectId, ref: 'user'}]
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
