import { CheckCircle } from "lucide-react"
import { useTitle } from "../../hooks/useTitle"

const OrderSuccess = () => {
    useTitle('Order Success')
    return (
        <div className="flex justify-center font-sans items-start min-h-screen  bg-gray-100 px-4 pt-10">
            <div className="max-w-md w-full text-center bg-white p-8 rounded shadow-md">
                <CheckCircle className="mx-auto mb-6 text-teal-900 w-20 h-20" />

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Your order has been placed successfully.
                </h2>

                <a
                    href="/my/orders"
                    className="inline-block mt-4 px-6 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded transition-colors duration-300"
                >
                    Go to Orders
                </a>
            </div>
        </div>
    )
}
export default OrderSuccess