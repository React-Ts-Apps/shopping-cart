import { Router } from 'express'
import { login, registerUser, logout, forgotPassword, resetPassword } from '../controllers/authController.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)

export default router