import ErrorHandler from "../utils/errorHandler.js";
import asyncError from "./asyncError.js";
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

export const isAuthenticated = asyncError(async (req, res, next) => {
    const { token } = req.cookies

    //If cookie is expired or undefined
    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

export const isAuthenticatedRole = (...roles) => {
    return (req, resp, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} not allowed for this operation`, 401))
        }
        next()
    }
}

