import asyncHandler from 'express-async-handler'
import { User } from '../models/user.js'
import { Post } from '../models/post.js'
import { Comment } from '../models/comment.js'
import { AppError } from '../utils/AppError.js'

class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const getPosts = asyncHandler(async (req, res, next) => {
  const features = new APIfeatures(Post.find(), req.query).paginating()
  // const features = new APIfeatures(
  //   Post.find({
  //     user: [...req.user?.following, req.user._id]
  //   }),
  //   req.query
  // ).paginating()

  const posts = await features.query
    .sort('-createdAt')
    .populate('user likes', 'avatar name followers')
    .populate({
      path: 'comments',
      populate: {
        path: 'user likes',
        select: '-password'
      }
    })
  res.json({
    message: 'Success!',
    result: posts.length,
    posts
  })
})
const getOnePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('user likes', 'avatar username fullname followers')
    .populate({
      path: 'comments',
      populate: {
        path: 'user likes',
        select: '-password'
      }
    })

  if (!post) return res.status(400).json({ msg: 'This post does not exist.' })

  res.json({ post })
})
const createPost = asyncHandler(async (req, res, next) => {
  const { description, images } = req.body

  if (images.length === 0) {
    return res.status(400).json({ msg: 'Please add your photo.' })
  }
  const newPost = new Post({ description, images, user: req.user._id })
  await newPost.save()

  res.json({
    message: 'Publicacion Creada!',
    post: {
      ...newPost._doc,
      user: req.user
    }
  })
})
const updatePost = asyncHandler(async (req, res, next) => {
  const { description, images } = req.body
  console.log('update post')
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { description, images }
  )
    .populate('user likes', 'avatar username fullname')
    .populate({
      path: 'comments',
      populate: {
        path: 'user likes',
        select: '-password'
      }
    })

  res.json({
    message: 'Publicacion Actualizada!',
    post: {
      ...post._doc,
      description,
      images
    }
  })
})
const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  })
  if (!post) throw new AppError('La publicacion no existe', 404)

  await Comment.deleteMany({ _id: { $in: post.comments } })

  res.json({
    message: 'Publicacion Eliminada',
    post: {
      ...post._doc,
      user: req.user
    }
  })
})

// Like unlike
const likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.find({ _id: req.params.id, likes: req.user._id })
  if (post.length > 0) {
    return res.status(400).json({ msg: 'You liked this post.' })
  }

  const like = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { likes: req.user._id }
    },
    { new: true }
  )

  if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

  res.json({ msg: 'Liked Post!' })
})
const unLikePost = asyncHandler(async (req, res, next) => {
  const like = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  )

  if (!like) {
    return res.status(400).json({ message: 'La publicacion no existe' })
  }

  res.json({ message: 'UnLiked Post!' })
})

// of User
const getUserPosts = asyncHandler(async (req, res, next) => {
  const features = new APIfeatures(
    Post.find({ user: req.params.id }),
    req.query
  ).paginating()
  const posts = await features.query.sort('-createdAt')

  res.json({ posts, result: posts.length })
})
const getPostsDiscover = asyncHandler(async (req, res, next) => {
  const newArr = [...req.user.following, req.user._id]
  const num = req.query.num || 9
  const posts = await Post.aggregate([
    { $match: { user: { $nin: newArr } } },
    { $sample: { size: Number(num) } }
  ])
  return res.json({
    message: 'Success!',
    result: posts.length,
    posts
  })
})
const getPostsSearch = asyncHandler(async (req, res, next) => {
  // too req.query.tags
  const posts = await Post.find({
    description: { $regex: req.query.query, $options: 'i' }
  })
    .limit(10)
    // .select("fullname username avatar")
    .sort('-createdAt')
    .populate('user likes', 'avatar name followers')
    .populate({
      path: 'comments',
      populate: {
        path: 'user likes',
        select: '-password'
      }
    })

  return res.json({
    message: 'Success!',
    result: posts.length,
    posts
  })
})

// Saved Posts
const savePost = asyncHandler(async (req, res, next) => {
  // 1) busco si ya guarde ese post
  const user = await User.find({ _id: req.user._id, saved: req.params.id })
  if (user.length > 0) {
    return res.status(400).json({ message: 'Ya guardaste esta publicación' })
  }
  // 2) Sino guardo en mis guardados
  const save = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { saved: req.params.id }
    },
    { new: true }
  )

  if (!save) return res.status(400).json({ message: 'Este usuario no existe' })

  res.json({ message: 'Publicacion Guardada!' })
})
const unSavePost = asyncHandler(async (req, res, next) => {
  const save = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { saved: req.params.id }
    },
    { new: true }
  )

  if (!save) return res.status(400).json({ msg: 'This user does not exist.' })

  res.json({ msg: 'unSaved Post!' })
})
const getSavePosts = asyncHandler(async (req, res, next) => {
  const features = new APIfeatures(
    Post.find({
      _id: { $in: req.user.saved }
    }),
    req.query
  ).paginating()

  const posts = await features.query.sort('-createdAt')

  res.json({
    posts,
    result: posts.length
  })
})

export {
  getPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  getUserPosts,
  getPostsDiscover,
  getPostsSearch,
  savePost,
  unSavePost,
  getSavePosts
}
