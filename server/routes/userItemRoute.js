const express = require('express')
const router = express.Router()
const { getItems } = require('../controllers/userItemsController')

//GET: fetch all items
router.get('/', getItems)
module.exports = router