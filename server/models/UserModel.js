import { Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter email'],
        validate: [validator.isEmail, 'Please enter valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxLength: [6, 'Password cannot exceed 6 characters'],
        select: false
    },
    avatar: String,

    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME })
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function () {
    //Generate token
    const token = crypto.randomBytes(32).toString('hex')

    //Hash it before saving
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000

    return token
}

const User = model('User', userSchema)
export default User