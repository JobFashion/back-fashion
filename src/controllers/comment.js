import asyncHandler from 'express-async-handler'
import { Comment } from '../models/comment.js'
import { Post } from '../models/post.js'

// for admin
const getAllComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find()
    .sort('-createdAt')
    .populate('user', 'avatar name')

  return res.json({ comments })
})

const createComment = asyncHandler(async (req, res, next) => {
  const { postId, content, tag, reply, postUserId } = req.body

  const post = await Post.findById(postId)
  if (!post) return res.status(400).json({ msg: 'This post does not exist.' })

  if (reply) {
    const cm = await Comment.findById(reply)
    if (!cm) {
      return res.status(400).json({ msg: 'This comment does not exist.' })
    }
  }

  const newComment = new Comment({
    user: req.user._id,
    content,
    tag,
    reply,
    postUserId,
    postId
  })

  await Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: { comments: newComment._id }
    },
    { new: true }
  )

  await newComment.save()

  res.json({ comment: newComment })
})
const updateComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body

  await Comment.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id
    },
    { content }
  )

  res.json({ message: 'Comentario Actualizado!' })
})
const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findOneAndDelete({
    _id: req.params.id,
    $or: [
      { user: req.user._id },
      { postUserId: req.user._id } // solo lo que creo el mismo
    ]
  })

  await Post.findOneAndUpdate(
    { _id: comment.postId },
    {
      $pull: { comments: req.params.id }
    }
  )

  res.json({ message: 'Comentario Eliminado!' })
})

// Like unlike
const likeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.find({
    _id: req.params.id,
    likes: req.user._id
  })
  if (comment.length > 0) {
    return res.status(400).json({ msg: 'You liked this post.' })
  }

  await Comment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { likes: req.user._id }
    },
    { new: true }
  )

  res.json({ message: 'Liked Comment!' })
})
const unLikeComment = asyncHandler(async (req, res, next) => {
  await Comment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  )

  res.json({ message: 'UnLiked Comment!' })
})

export {
  getAllComments,
  createComment,
  updateComment,
  likeComment,
  unLikeComment,
  deleteComment
}
