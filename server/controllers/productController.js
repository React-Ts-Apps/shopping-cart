import Product from '../models/ProductModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import asyncError from '../middlewares/asyncError.js'
import ApiFeatures from '../utils/apiFeatures.js'

//Create product - /api/v1/product/new
// eslint-disable-next-line no-unused-vars
const newProduct = asyncError(async (req, res, next) => {
    const product = await Product.create(req.body)
    return res.status(201).json({ success: true, product })
})

//Get products - /api/v1/products
//Search using keyword
const getProducts = async (req, res) => {
    const searchFeatures = new ApiFeatures(Product.find(), req.query).
        search().
        filter().
        paginate()

    const products = await searchFeatures.query
    return res.status(201).json({ success: true, count: products.length, products })
}

//Get single product - /api/v1/products/:id
const getProductById = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    return res.status(201).json({ success: true, product })
}


//Update product - /api/v1/products/:id
const updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    return res.status(201).json({ success: true, product })
}

//Delete product - /api/v1/products/:id
const deleteProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not exists' })
    }
    await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json({ success: true, message: 'Product deleted' })
}

export { newProduct, getProducts, getProductById, updateProduct, deleteProduct }