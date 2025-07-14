import CheckoutGuide from "./CheckoutGuide"
import { useTitle } from "../../hooks/useTitle"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import { useGetStripeApiKeyQuery } from "../../services/authApi"

import StripeForm from "./StripeForm"

const stripePromise = (key: string) => loadStripe(key);

const Payment = () => {
    useTitle('Payment')
    const { data } = useGetStripeApiKeyQuery()
    const stripeKey = data?.stripeKey
    if (!stripeKey) return <p>Not able to pay.</p>

    return (
        <>
            <CheckoutGuide hasItems shipping hasConfirmed hasPaid />
            <Elements stripe={stripePromise(stripeKey)}>
                <StripeForm />
            </Elements>

        </>)

}
export default Payment