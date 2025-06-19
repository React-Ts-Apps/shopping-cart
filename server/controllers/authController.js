import asyncError from "../middlewares/asyncError.js";
import User from "../models/UserModel.js";
import { sendEmail } from "../utils/email.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendJwt from "../utils/jwt.js";
import crypto from 'crypto'

//Register user- /api/v1/register
// eslint-disable-next-line no-unused-vars
const registerUser = asyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body
    const user = await User.create({
        name, email, password, avatar
    })

    sendJwt(user, res, 201)
})

//Login- /api/v1/login
const login = asyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }
    //Find the user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    if (! await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendJwt(user, res, 201)

})

//Logout- /api/v1/logout
const logout = (req, res, next) => {
    res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
        .status(200)
        .json({ success: true, message: 'Successfully loggedout' })
    next()
}

//Forgot password- /api/v1/forgot/password
const forgotPassword = asyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('User does not exist'))
    }
    const resetToken = user.getResetToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/forgot/password/${resetToken}`
    const message = `Your password reset url is as follows \n\n ${resetUrl} \n\n 
            If you have not requested password change, ignore this email`

    try {
        sendEmail({
            email: user.email,
            subject: 'TasteHub Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

//Reset Password- /api/v1/reset/:token
const resetPassword = asyncError(async (req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log(token)
    const user = await User.findOne({
        resetPasswordToken: token.toString()
    })
    if (!user) {
        return next(new ErrorHandler('Password reset token invalid or expired', 401))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesnt match', 401))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save({ validateBeforeSave: false })
    sendJwt(user, res, 201)
})

//Get user profile - /api/v1/myprofile
// eslint-disable-next-line no-unused-vars
const getUserProfile = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user })
})

//Change password - /password/change
const changePassword = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    //Check old password
    if (!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401))
    }

    //Use new password
    user.password = req.body.password
    await user.save()
    res.status(200).json({ success: true })
})

//Update profile -/update/profile
// eslint-disable-next-line no-unused-vars
const updateProfile = asyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, user })
})

export {
    registerUser, login, logout,
    forgotPassword, resetPassword, getUserProfile,
    changePassword, updateProfile
}