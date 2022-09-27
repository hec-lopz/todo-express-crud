import { Router } from 'express'
import { getMe, loginUser, registerUser } from '../controllers/users.controller'
import { protect } from '../middlewares/auth.handler'

const router = Router()

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

export default router
