const express = require('express')
const router = express.Router()
const { getAdminProductList, addItem } = require('../controllers/admin/adminController')

//GET: fetch all products
router.get('/', getAdminProductList)

//POST: add new product
router.post('/', addItem)
module.exports = router

