import CheckoutGuide from "./CheckoutGuide"
import { useTitle } from "../../hooks/useTitle"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import { useGetStripeApiKeyQuery } from "../../services/authApi"
import PaymentForm from "./PaymentForm"

const stripePromise = (key: string) => loadStripe(key);

const Payment = () => {
    useTitle('Payment')
    const { data } = useGetStripeApiKeyQuery()
    const stripeKey = data?.stripeKey
    if (!stripeKey) return <h2 className="mt-5 text-center text-xl font-semibold">Not able to pay.</h2>
    return (
        <>
            <CheckoutGuide hasItems shipping hasConfirmed hasPaid />
            <Elements stripe={stripePromise(stripeKey)}>
                <PaymentForm />
            </Elements>

        </>)

}
export default Payment