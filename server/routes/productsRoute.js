import { Router } from 'express'
import { newProduct, getProducts, getProductById, updateProduct, deleteProduct, createReview, getReviews, deleteReview } from '../controllers/productController.js'
import { isAuthenticated, isAuthenticatedRole } from '../middlewares/authenticate.js'

const router = Router()

//GET: All products
router.route('/products').get(getProducts)

//GET: get product by id
//PUT: update product by id
router.route('/products/:id').
    get(getProductById).
    put(isAuthenticated, isAuthenticatedRole('admin'), updateProduct).
    delete(isAuthenticated, isAuthenticatedRole('admin'), deleteProduct)

router.route('/review').put(isAuthenticated, createReview).
    delete(isAuthenticated, deleteReview)
router.route('/reviews').get(getReviews)

//Admin routes    
//POST: add new product
router.route('/admin/product/new').post(isAuthenticated, isAuthenticatedRole('admin'), newProduct)

export default router

