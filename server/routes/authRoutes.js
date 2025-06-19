import { Router } from 'express'
import { login, registerUser, logout } from '../controllers/authController.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').get(logout)

export default router