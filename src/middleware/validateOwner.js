// import { Post } from '../models/post.js'
// import { Comment } from '../models/comment.js'
// import { User } from '../models/user.js'

// const models = {
//   Post: Post,
//   Comment: Comment,
//   User: User
// }

export const validateOwner = (model = 'Post') => {
  return async (req, res, next) => {
    console.log('estoy aca 2')
    const itemId = req.params.id || req.body.id
    // const { id: userId } = req.user

    if (!itemId) return res.status(400).json({ message: 'id invalido' })

    try {
      // const itemUser = await models[model].findOne({ _id: itemId })
      // if (itemUser.user.id !== userId) return res.status(403).json({ message: 'Acceso Denegado' })
      next()
    } catch (error) {
      return res.status(500).json({ message: 'Error del Servidor' })
    }
  }
}
