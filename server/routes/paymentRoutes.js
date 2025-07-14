import { Router } from 'express'
import { isAuthenticated } from '../middlewares/authenticate.js'
import { processPaymnet, sendStripeKey } from '../controllers/paymentController.js'

const router = new Router()

router.route('/payment/process').post(isAuthenticated, processPaymnet)
router.route('/stripe/api').get(isAuthenticated, sendStripeKey)

export default router