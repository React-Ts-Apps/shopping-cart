import asyncError from "../middlewares/asyncError.js";
import User from "../models/UserModel.js";

// eslint-disable-next-line no-unused-vars
const registerUser = asyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body
    const user = await User.create({
        name, email, password, avatar
    })
    res.status(201).json({ success: true, user })
})
export { registerUser }