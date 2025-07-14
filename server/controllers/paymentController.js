import asyncError from "../middlewares/asyncError.js";
import Stripe from 'stripe'

const stripeInfo = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15', // use the latest supported version
});

// eslint-disable-next-line no-unused-vars
export const processPaymnet = asyncError(async (req, res, next) => {
    const paymentIntent = await stripeInfo.paymentIntents.create({

        amount: Math.round(req.body.amount * 100), //øre to krone
        currency: 'nok',
        description: "Test Payment",
        metadata: { integration_check: "accept_payment" },
        shipping: req.body.shipping
    })
    res.status(200).json({ success: true, client_secret: paymentIntent.client_secret })
})

// eslint-disable-next-line no-unused-vars
export const sendStripeKey = asyncError(async (req, res, next) => {
    res.status(200).json({ stripeKey: process.env.STRIPE_PUBLIC_KEY })
})
