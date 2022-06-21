import mongoose from 'mongoose'

const { model, Schema, Types } = mongoose
const notifySchema = new Schema({
  id: Types.ObjectId,
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  recipients: [
    Types.ObjectId
  ],
  url: String,
  text: String,
  content: String,
  image: String,
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export const Notify = model('Notify', notifySchema)
