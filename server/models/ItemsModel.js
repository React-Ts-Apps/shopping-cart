const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imgSrc: String
})

const Items = mongoose.model('Items', itemSchema)
module.exports = Items