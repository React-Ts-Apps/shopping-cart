import { Schema, model } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Call pre save middleware to check if password is modified
// Hash password before saving

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        this.password = await hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password)
}


const User = model('User', userSchema)
export default User