import asyncError from "../middlewares/asyncError.js";
import User from "../models/UserModel.js";
import { sendEmail } from "../utils/email.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendJwt from "../utils/jwt.js";
import crypto from 'crypto'

// eslint-disable-next-line no-unused-vars
const registerUser = asyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body
    const user = await User.create({
        name, email, password, avatar
    })

    sendJwt(user, res, 201)
})

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

const logout = (req, res, next) => {
    res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
        .status(200)
        .json({ success: true, message: 'Successfully loggedout' })
    next()
}

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

export { registerUser, login, logout, forgotPassword, resetPassword }