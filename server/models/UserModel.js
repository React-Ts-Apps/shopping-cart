import { Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please eneter name']
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
        maxLength: [6, 'Password cannot exceed 6 characters']
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

// eslint-disable-next-line no-unused-vars
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})
const User = model('User', userSchema)
export default User