import { Schema, model } from 'mongoose'

const itemSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imgSrc: String
})

const Items = model('Items', itemSchema)
export default Items