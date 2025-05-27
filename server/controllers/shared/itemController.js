import Items from '../../models/ItemsModel.js'

const getItems = async (req, res) => {
    try {
        const items = await Items.find()
        res.json(items)
    } catch (error) {
        res.status(500).json({ message: 'Server error in providing Items', error })
    }
}

export default getItems 