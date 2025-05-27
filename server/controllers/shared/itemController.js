const Items = require('../../models/ItemsModel')

const getItems = async (req, res) => {
    try {
        const items = await Items.find()
        res.json(items)
    } catch (error) {
        res.status(500).json({ message: 'Server error in providing Items', error })
    }
}

module.exports = { getItems }