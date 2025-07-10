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
import multer from 'multer'
import { generateFileName } from '../utils/generateFileName.js'
import path from 'path';
import { fileURLToPath } from 'url';

//Recreate __dirname (For ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router()

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/user'))
        },
        filename: function (req, file, cb) {
            const uniqueFileName = generateFileName(file)
            req.generatedFileName = uniqueFileName
            cb(null, uniqueFileName);
        }
    })
})

router.route('/register').post(upload.single('avatar'), registerUser)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAuthenticated, changePassword)
router.route('/me').get(isAuthenticated, getUserProfile)
router.route('/update/profile').put(isAuthenticated, updateProfile)

//Admin routes
router.route('/admin/users').get(isAuthenticated, isAuthenticatedRole('admin'), getUsers)
router.route('/admin/user/:id')
    .get(isAuthenticated, isAuthenticatedRole('admin'), getUser)
    .put(isAuthenticated, isAuthenticatedRole('admin'), updateUser)
    .delete(isAuthenticated, isAuthenticatedRole('admin'), deleteUser)

export default router