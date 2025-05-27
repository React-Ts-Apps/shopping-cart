const User = require('../../models/UserModel')

const auth = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // Check use already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' })
        }
        const newUser = await User.create({ name, email, password })
        return res.status(200).json({ _id: newUser._id, email: newUser.email, message: 'Registered successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error })
    }

}

module.exports = { auth }