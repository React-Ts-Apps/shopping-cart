const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true }
})

// Call pre save middleware to check if password is modified
// Hash password before saving

userSchema.pre('save', async function (next) {
    if (!this.isModified(this.password)) return next()
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User