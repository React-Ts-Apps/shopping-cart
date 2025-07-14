import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState, type FormEvent } from "react"
import { useStripeProcessMutation } from "../../services/authApi"
import { showToast } from "../../utils/showToast"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

const StripeForm = () => {
    const [name, setName] = useState('')
    const { shippingInfo } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.auth)

    const [stripeProcess] = useStripeProcessMutation()
    const elements = useElements()
    const stripe = useStripe()

    const orderInfo = sessionStorage.getItem('orderInfo') ? JSON.parse(sessionStorage.getItem('orderInfo') as string) : null;

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
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
                showToast.success('Order Completed')
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

                        <div>
                            <label htmlFor="cardnum_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number
                            </label>
                            <div className="w-full border h-10 border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500">
                                <CardNumberElement
                                    id="cardnum_field"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#374151',
                                                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                                                '::placeholder': {
                                                    color: '#9CA3AF',
                                                },
                                            },
                                            invalid: {
                                                color: '#DC2626',
                                                iconColor: '#DC2626',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cardcvc_field" className="block text-sm font-medium text-gray-700 mb-1">
                                CVC Code
                            </label>
                            <div className="w-full border h-10 border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500">
                                <CardCvcElement
                                    id="cardcvc_field"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#374151',
                                                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                                                '::placeholder': {
                                                    color: '#9CA3AF',
                                                },
                                            },
                                            invalid: {
                                                color: '#DC2626',
                                                iconColor: '#DC2626',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cardexp_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Card Expiry
                            </label>
                            <div className="w-full border h-10 border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500">
                                <CardExpiryElement
                                    id="cardexp_field"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#374151',
                                                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                                                '::placeholder': {
                                                    color: '#9CA3AF',
                                                },
                                            },
                                            invalid: {
                                                color: '#DC2626',
                                                iconColor: '#DC2626',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            id="payment_btn"
                            type="submit"
                            className="w-full  mt-4 py-3 rounded-xl text-white font-semibold  bg-orange-400 hover:bg-teal-700">
                            Pay - {`kr ${orderInfo && orderInfo.totalPrice}`}
                        </button>
                    </form>
                </div>
            </div>
        </>)

}
export default StripeForm