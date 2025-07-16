import Product from '../models/ProductModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import asyncError from '../middlewares/asyncError.js'
import ApiFeatures from '../utils/apiFeatures.js'

//Create product - /api/v1/product/new
// eslint-disable-next-line no-unused-vars
const newProduct = asyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    return res.status(201).json({ success: true, product })
})

//Get products - /api/v1/products
//Search using keyword
const getProducts = async (req, res) => {
    const { limit = 10 } = req.query

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter()

    const totalCount = await apiFeatures.query.clone().countDocuments({})
    const products = await apiFeatures.paginate().query

    return res.status(201).json({
        success: true,
        count: products.length,
        total: totalCount,
        limit: Number(limit),
        products
    })
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

//Create review - /api/v1/review
// eslint-disable-next-line no-unused-vars
const createReview = asyncError(async (req, res, next) => {
    console.log(1)
    const { productId, comment, rating } = req.body
    const review = {
        user: req.user.id,
        comment,
        rating
    }
    const product = await Product.findById(productId)
    console.log(product)
    //Find if user already reviewed
    const hasReviewed = product.reviews.find(review => {
        return review.user.toString() === req.user.id.toString()
    })
    console.log(hasReviewed)

    if (hasReviewed) {
        //Update existing review
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user.id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })

    } else {
        //Add new review
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    //Update overall product ratings
    product.ratings = product.reviews.reduce((accum, review) => {
        return review.rating + accum
    }, 0) / product.numOfReviews

    await product.save({ validateBeforeSave: false })
    res.status(200).json({ success: true, message: 'Review added' })

})

//Create review - /api/v1/reviews
const getReviews = asyncError(async (req, res) => {
    const product = await Product.findById(req.query.id)
    res.status(200).json({ success: true, reviews: product.reviews })
})

//Delete review - /api/v1/review

const deleteReview = asyncError(async (req, res) => {
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(review => review.id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length
    let ratings = 0
    if (numOfReviews > 0) {
        ratings = reviews.reduce((accum, review) => {
            return review.rating + accum
        }, 0) / numOfReviews
    }
    await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews })
    res.status(200).json({ success: true })
})

export {
    newProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createReview,
    getReviews,
    deleteReview
}