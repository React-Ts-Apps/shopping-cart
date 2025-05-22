const Items = require('../../models/ItemsModel')
const { getItems } = require('../shared/itemController')

const addItem = async (req, res) => {
    const { name, description, price, imgSrc } = req.body
    if (!name || !description || !price || !imgSrc) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const newItem = new Items({
            name,
            description,
            price,
            imgSrc
        })
        const savedItem = await newItem.save()
        res.status(201).json(savedItem)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}
module.exports = { getAdminProductList: getItems, addItem }