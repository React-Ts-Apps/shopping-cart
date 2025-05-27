const express = require('express')
const router = express.Router()
const { auth } = require('../controllers/shared/authController')

router.post('/', auth)

module.exports = router