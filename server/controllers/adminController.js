const items = require('../data/items')
const getAdminProductList = (req, res) => {
    res.json(items)
}
module.exports = { getAdminProductList }