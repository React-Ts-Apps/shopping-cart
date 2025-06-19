import { Router } from 'express'
import {
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile
} from '../controllers/authController.js'
import { isAuthenticated } from '../middlewares/authenticate.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAuthenticated, changePassword)
router.route('/myprofile').get(isAuthenticated, getUserProfile)
router.route('/update/profile').put(isAuthenticated, updateProfile)


export default router