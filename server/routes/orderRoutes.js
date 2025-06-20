import { Router } from "express";
import { deleteOrder, getOrder, myOrders, newOrder, orders, updateOrder } from "../controllers/orderController.js";
import { isAuthenticated, isAuthenticatedRole } from "../middlewares/authenticate.js";

const router = new Router()

router.route('/order/new').post(isAuthenticated, newOrder)
router.route('/order/:id').get(isAuthenticated, getOrder)
router.route('/myorders').get(isAuthenticated, myOrders)

//Admin routes
router.route('/admin/orders').get(isAuthenticated, isAuthenticatedRole('admin'), orders)
router.route('/admin/update/order/:id').post(isAuthenticated, isAuthenticatedRole('admin'), updateOrder)
router.route('/admin/delete/order/:id').delete(isAuthenticated, isAuthenticatedRole('admin'), deleteOrder)

export default router