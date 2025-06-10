import asyncError from "../middlewares/asyncError.js";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// eslint-disable-next-line no-unused-vars
const registerUser = asyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body
    const user = await User.create({
        name, email, password, avatar
    })

    const token = user.getJwtToken()
    res.status(201).json({ success: true, user, token })
})

const login = asyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return new ErrorHandler(next('Please enter email and password', 400))
    }
    //Find the user
    const user = await User.findOne().select('+password')
    if (!user) {
        return new ErrorHandler('Invalid email or password', 400)
    }
    if (! await user.isValidPassword(password)) {
        return new ErrorHandler('Invalid email or password', 400)
    }

})
export { registerUser, login }