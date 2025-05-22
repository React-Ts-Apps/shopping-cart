const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imgSrc: String
})

module.exports = mongoose.model('Items', itemSchema)