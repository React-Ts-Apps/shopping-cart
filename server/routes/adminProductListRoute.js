const express = require('express')
const router = express.Router()
const { getAdminProductList } = require('../controllers/adminController')

router.get('/', getAdminProductList)
module.exports = router

