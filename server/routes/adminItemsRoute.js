import { Router } from 'express'
import adminController from '../controllers/admin/adminController.js'

const router = Router()

//GET: fetch all products
router.get('/items', adminController.getAdminProductList)

//POST: add new product
router.post('/save/item', adminController.addItem)
export default router

