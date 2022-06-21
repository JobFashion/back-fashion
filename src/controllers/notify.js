import asyncHandler from 'express-async-handler'
import { Notify } from '../models/notify.js'

const getNotifies = asyncHandler(async (req, res, next) => {
  const notifies = await Notify.find({ recipients: req.user._id })
    .sort('-createdAt').populate('user', 'avatar username')

  return res.json({ notifies })
})
const createNotify = asyncHandler(async (req, res, next) => {
  const { id, recipients, url, text, content, image } = req.body

  if (recipients.includes(req.user._id.toString())) return

  const notify = new Notify({
    id, recipients, url, text, content, image, user: req.user._id
  })

  await notify.save()
  return res.json({ notify })
})
const deleteNotify = asyncHandler(async (req, res, next) => {
  const notify = await Notify.findOneAndDelete({
    id: req.params.id, url: req.query.url
  })

  return res.json({ notify })
})

const isReadNotify = asyncHandler(async (req, res, next) => {
  const notifies = await Notify.findOneAndUpdate({
    _id: req.params.id
  }, {
    isRead: true
  })

  return res.json({ notifies })
})
const deleteAllNotifies = asyncHandler(async (req, res, next) => {
  const notifies = await Notify.deleteMany({ recipients: req.user._id })

  return res.json({ notifies })
})

export { getNotifies, createNotify, deleteNotify, isReadNotify, deleteAllNotifies }
