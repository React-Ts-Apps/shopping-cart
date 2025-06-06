import { data } from '../data/products.js'
import Product from '../models/ProductModel.js'
import connectDB from '../config/db.js'

connectDB()

const seedProducts = async () => {
    try {
        await Product.deleteMany()
        console.log('Products deleted')
        await Product.insertMany(data)
        console.log('All products added')
    } catch (error) {
        console.log(error)
    }
    process.exit(1)
}
seedProducts()