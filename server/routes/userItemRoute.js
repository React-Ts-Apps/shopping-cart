import { Router } from 'express'
import getItems from '../controllers/user/userItemController.js'
const router = Router()

//GET: fetch all items
router.get('/items', getItems)

export default router