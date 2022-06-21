import mongoose from 'mongoose'

const { model, Schema, Types } = mongoose
const postSchema = new Schema({
  description: String,
  images: {
    type: Array,
    required: true
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: Types.ObjectId,
      ref: 'Comment'
    }
  ],
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  status: { type: Boolean, default: true },
  views: { type: Number, default: 0 } // Revisar
}, {
  timestamps: true
})

export const Post = model('Post', postSchema)
