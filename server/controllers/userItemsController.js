const items = require('../data/items')

const getItems = (req, res) => {
    res.json(items)
}
module.exports = { getItems }