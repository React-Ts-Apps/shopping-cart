import User from '../../models/UserModel.js'

const signUp = async (req, res) => {
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

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Email not registered' })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({ user, message: 'Invalid email or password' })
        }
        return res.status(200).json({ _id: user._id, name: user.name, email: user.email, message: 'Login successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error })
    }

}

const auth = { signUp, login }

export default auth