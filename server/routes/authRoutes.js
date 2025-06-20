import { Router } from 'express'
import {
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/authController.js'
import { isAuthenticated, isAuthenticatedRole } from '../middlewares/authenticate.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAuthenticated, changePassword)
router.route('/myprofile').get(isAuthenticated, getUserProfile)
router.route('/update/profile').put(isAuthenticated, updateProfile)

//Admin routes
router.route('/admin/users').get(isAuthenticated, isAuthenticatedRole('admin'), getUsers)
router.route('/admin/user/:id')
    .get(isAuthenticated, isAuthenticatedRole('admin'), getUser)
    .put(isAuthenticated, isAuthenticatedRole('admin'), updateUser)
    .delete(isAuthenticated, isAuthenticatedRole('admin'), deleteUser)

export default router