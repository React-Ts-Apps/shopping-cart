import asyncError from "../middlewares/asyncError.js";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendJwt from "../utils/jwt.js";

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

export { registerUser, login, logout }