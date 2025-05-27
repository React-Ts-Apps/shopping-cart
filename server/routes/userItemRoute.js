import { Router } from 'express'
import getItems from '../controllers/shared/itemController.js'
const router = Router()

//GET: fetch all items
router.get('/items', getItems)

export default router