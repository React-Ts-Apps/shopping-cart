import { Router } from 'express'
import { newProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js'

const router = Router()

//GET: All products
router.route('/products').get(getProducts)

//POST: add new product
router.route('/product/new').post(newProduct)

//GET: get product by id
//PUT: update product by id
router.route('/products/:id').
    get(getProductById).
    put(updateProduct).
    delete(deleteProduct)

export default router

