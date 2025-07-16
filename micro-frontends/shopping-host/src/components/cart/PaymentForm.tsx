import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState, type FormEvent } from "react"
import { useStripeProcessMutation } from "../../services/authApi"
import { showToast } from "../../utils/showToast"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { usePlaceOrderMutation } from "../../services/orderApi"
import StripeField from "../stripe/StripeField"
import { Loader } from "lucide-react"
import { useOrderValidation } from "../../hooks/useOrderValidation"

const PaymentForm = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const { shippingInfo, items } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.auth)
    const validateOrder = useOrderValidation()
    const [stripeProcess] = useStripeProcessMutation()
    const [placeOrder] = usePlaceOrderMutation()
    const elements = useElements()
    const stripe = useStripe()
    const navigate = useNavigate()

    const orderInfo = sessionStorage.getItem('orderInfo') ? JSON.parse(sessionStorage.getItem('orderInfo') as string) : null;

    useEffect(() => {
        validateOrder('payment')
    })

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const shipping = {
                name,
                address: {
                    line1: shippingInfo.address,
                    city: shippingInfo.city,
                    postal_code: shippingInfo.postalCode,
                    country: shippingInfo.country
                }
            }
            const res = await stripeProcess({ amount: orderInfo.totalPrice, shipping }).unwrap()
            const client_secret = res.client_secret
            const cardElement = elements?.getElement(CardNumberElement);

            if (!stripe || !elements || !cardElement) {
                showToast.error('Payment failed')
                return;
            }

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.name || '',
                        email: user?.email || '',
                    },
                },
            });

            if (result.paymentIntent?.status === 'succeeded') {
                const paidAt = new Date(result.paymentIntent.created * 1000)

                const orderItems = items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.images[0].image,
                    price: item.price,
                    product: item._id,
                }))

                const orderData = {
                    shippingInfo,
                    orderItems,
                    paidAt,
                    createdAt: Date.now(),
                    paymentInfo: {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    },
                    ...orderInfo
                }
                try {
                    const res = await placeOrder(orderData).unwrap()
                    showToast.success(res.message)
                    navigate('/order/success', { replace: true })
                } catch (e) {
                    console.log(e)
                    showToast.error('Order cannot be placed. Contact support')
                }

            } else {
                showToast.error('Payment failed')
            }

        } catch (error) {
            console.log(error)
            showToast.error('Payment failed')
        }
    }
    return (
        <>
            <div className="flex justify-center font-serif items-start min-h-screen  bg-gray-100 px-4 pt-10">
                <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <h1 className="text-2xl font-semibold mb-6">Payment</h1>
                        <div>
                            <label htmlFor="name_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Name on Card
                            </label>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name_field"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500  border-gray-300"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <StripeField id='cardnum_field' label='Card Number' Element={CardNumberElement} />
                        <StripeField id='cardcvc_field' label='CVC Code' Element={CardCvcElement} />
                        <StripeField id='cardexp_field' label='Card Expiry' Element={CardExpiryElement} />
                        <button
                            id="payment_btn"
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-4 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 hover:bg-teal-700'
                                }`}>
                            {loading ? (
                                <>
                                    <span className="text-gray-400">Processing</span>
                                    <Loader className="animate-spin w-5 h-5 text-gray-700" />
                                </>
                            ) : (
                                `Pay - kr ${orderInfo?.totalPrice}`
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </>)

}
export default PaymentForm