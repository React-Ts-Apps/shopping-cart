import Product from '../models/ProductModel.js'

//Create product - /api/v1/product/new
const newProduct = async (req, res) => {
    const product = await Product.create(req.body)
    return res.status(201).json({ success: true, product })
}

//Get products - /api/v1/products
const getProducts = async (req, res) => {
    const products = await Product.find()
    return res.status(201).json({ success: true, products, count: products.length })
}

//Get single product - /api/v1/products/:id
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' })
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