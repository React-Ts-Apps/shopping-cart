const items = require('../data/items')
const getAdminProductList = (req, res) => {
    res.json(items)
}

const addItem = (req, res) => {
    const { name, description, price, imgSrc } = req.body
    if (!name || !description || !price || !imgSrc) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const newItem = {
        id: items.length + 1,
        name,
        description,
        price,
        imgSrc
    }
    items.push(newItem)
    res.status(201).json(newItem)
}
module.exports = { getAdminProductList, addItem }