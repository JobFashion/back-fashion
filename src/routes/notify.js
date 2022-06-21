import { Router } from 'express'
import { validJWT } from '../middleware/validJWT.js'
import * as notifyController from '../controllers/notify.js'

const router = Router()

router.get('/', validJWT, notifyController.getNotifies)
router.post('/', validJWT, notifyController.createNotify)
router.delete('/:id', validJWT, notifyController.deleteNotify)
router.patch('/isReadNotify/:id', validJWT, notifyController.isReadNotify)
router.delete('/deleteAllNotify', validJWT, notifyController.deleteAllNotifies)

export default router
