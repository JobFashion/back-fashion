import mongoose from 'mongoose'

const { model, Schema, Types } = mongoose
const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  tag: Object, // revisar
  reply: Types.ObjectId,
  likes: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  postId: Types.ObjectId,
  postUserId: Types.ObjectId,
  status: { type: Boolean, default: true }
}, {
  timestamps: true
})

export const Comment = model('Comment', commentSchema)
