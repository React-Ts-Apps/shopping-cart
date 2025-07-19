
import asyncError from "../middlewares/asyncError.js";
import Order from "../models/orderModel.js";
import Product from "../models/ProductModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//New order -/api/v1/order/new
// eslint-disable-next-line no-unused-vars
export const newOrder = asyncError(async (req, res, next) => {
    const { orderItems,
        shippingInfo,
        shippingPrice,
        itemsPrice,
        totalPrice,
        taxValue,
        paidAt,
        createdAt,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        shippingPrice,
        itemsPrice,
        totalPrice,
        taxValue,
        paidAt,
        createdAt,
        paymentInfo,
        user: req.user.id
    })

    for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
    }

    res.status(200).json({ success: true, order, message: 'Order placed successfully' })
})

//Get specific order -/api/v1/order/:id
export const getOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }
    res.status(200).json({ success: true, order })
})

//Get my orders -/api/v1/myorders
// eslint-disable-next-line no-unused-vars
export const myOrders = asyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json({ success: true, orders })
})

export const validateOrder = asyncError(async (req, res, next) => {
    const stockData = req.body
    const productIds = stockData.map(item => item.productId)
    const products = await Product.find({ _id: { $in: productIds } })
    const stockMap = new Map();
    products.forEach(p => stockMap.set(p._id.toString(), p.stock))
    const stockList = []
    let hasError = false
    for (const item of stockData) {
        const stock = stockMap.get(item.productId)
        if (!stock || stock < item.quantity) {
            hasError = true
            stockList.push({ _id: item.productId, stock })
        }
    }
    if (hasError) return next(res.status(404).json({ success: false, stockList }))
    else return res.status(200).json({ success: true })
})

//Get orders for Admin - /api/v1/admin/orders
// eslint-disable-next-line no-unused-vars
export const orders = asyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice)
    res.status(200).json({ success: true, orders, totalAmount })
})

//Admin: update order -/api/v1/admin/order/:id
export const updateOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order already delivered', 402))
    }
    //Updating stock of product
    order.orderItems.forEach(async item => await updateStock(item.product, item.quantity))
    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now()
    await order.save()
    res.status(200).json({ success: true, order })
})

//Admin: Delete order - /api/v1/admin/order/:id
export const deleteOrder = async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('Order does not exist', 402))
    }
    await Order.findByIdAndDelete(req.params.id)
    return res.status(200).json({ success: true, message: 'Order deleted' })
}

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity
    await product.save({ validateBeforeSave: false })
}