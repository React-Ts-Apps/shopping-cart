const express = require('express')
const router = express.Router()
const { getItems } = require('../controllers/userItemsController')

router.get('/', getItems)
module.exports = router