import { Link } from "react-router-dom";

type CheckoutProps = {
    hasItems: boolean;
    shipping?: boolean;
    hasConfirmed?: boolean;
    hasPaid?: boolean;
}

const CheckoutGuide = ({ hasItems, shipping, hasConfirmed, hasPaid }: CheckoutProps) => {
    return (
        <div className="flex justify-center mt-6">
            <div className="bg-white shadow-md rounded-lg px-6 py-4 flex items-center space-x-6 max-w-5xl w-full">
                {hasItems && (
                    <>
                        {/* Cart */}
                        <Link to="/home/cart" className="flex items-center group transition-transform hover:scale-105">
                            <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-orange-600 shadow"></div>
                            <span className="ml-2 text-sm font-semibold text-gray-800 group-hover:text-orange-500">
                                Your Cart
                            </span>
                            <div className={`w-6 h-1 mx-2 ${shipping ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                        </Link>

                        {/* Shipping */}
                        <Link to="/shipping" className="flex items-center group transition-transform hover:scale-105">
                            <div className={`w-5 h-5 rounded-full border-2 shadow ${shipping ? 'bg-orange-500 border-orange-600' : 'bg-gray-300 border-gray-400'}`}></div>
                            <span className={`ml-2 text-sm font-semibold ${shipping ? 'text-gray-800' : 'text-gray-500'} group-hover:text-orange-500`}>
                                Shipping Info
                            </span>
                            <div className={`w-6 h-1 mx-2 ${hasConfirmed ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                        </Link>

                        {/* Confirm Order */}
                        <Link to="/confirm/order" className="flex items-center group transition-transform hover:scale-105">
                            <div className={`w-5 h-5 rounded-full border-2 shadow ${hasConfirmed ? 'bg-orange-500 border-orange-600' : 'bg-gray-300 border-gray-400'}`}></div>
                            <span className={`ml-2 text-sm font-semibold ${hasConfirmed ? 'text-gray-800' : 'text-gray-500'} group-hover:text-orange-500`}>
                                Confirm Order
                            </span>
                            <div className={`w-6 h-1 mx-2 ${hasPaid ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                        </Link>

                        {/* Payment */}
                        <Link to="/payment" className="flex items-center group transition-transform hover:scale-105">
                            <div className={`w-5 h-5 rounded-full border-2 shadow ${hasPaid ? 'bg-orange-500 border-orange-600' : 'bg-gray-300 border-gray-400'}`}></div>
                            <span className={`ml-2 text-sm font-semibold ${hasPaid ? 'text-gray-800' : 'text-gray-500'} group-hover:text-orange-500`}>
                                Payment
                            </span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
export default CheckoutGuide