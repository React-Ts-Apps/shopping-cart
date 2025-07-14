import { useSelector } from "react-redux"
import { useTitle } from "../../hooks/useTitle"
import CheckoutGuide from "./CheckoutGuide"
import type { RootState } from "../../redux/store"
import { Link } from "react-router-dom"
import { cartCountSelector, cartSumSelector } from "../../redux/features/cart/selectors"

const ConfirmOrder = () => {
    useTitle('Confirm Order')
    const { user } = useSelector((state: RootState) => state.auth)
    const { shippingInfo, items } = useSelector((state: RootState) => state.cart)
    const cartCount = useSelector(cartCountSelector);
    const cartSum = useSelector(cartSumSelector)

    return (<>
        <CheckoutGuide hasItems shipping hasConfirmed />
        <div className="ml-8 mt-6 grid grid-cols-1 lg:grid-cols-3  gap-10 max-w-7xl">
            <div className="lg:col-span-2 space-y-4">
                <h2 className="mt-5 text-2xl text-gray-700 font-serif font-semibold">
                    Shipping Details:
                </h2>
                <p className="ml-2"><b>Name:</b> {user?.name}</p>
                <p className="ml-2"><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4 ml-2"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country} </p>

                <hr className=" border-gray-300 mb-6" />
                <h4 className="mt-5 text-2xl text-gray-700 font-serif font-semibold">Your Cart Items:</h4>
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center px-2 py-3 border-b border-gray-200 gap-x-2">
                        <div className="w-16 flex-shrink-0">
                            <img
                                src={item.images[0].image}
                                alt={item.name}
                                className="w-16 h-12 object-cover rounded" />
                        </div>

                        <div className="flex-1 px-2 max-w-xs">
                            <Link
                                to={`/product/${item._id}`}
                                className="text-teal-600 font-serif hover:underline font-medium truncate">
                                {item.name}
                            </Link>
                        </div>

                        <div className="text-right text-gray-800 text-md font-serif min-w-[120px]">
                            {item.quantity} x kr {item.price} = <b>kr {item.quantity * item.price}</b>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-6 mt-20 border border-gray-300  text-center rounded shadow-lg pl-8 font-serif h-fit bg-white">
                <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
                <hr className="border-gray-300 mb-6" />

                <p className="mb-3">
                    Subtotal:{' '}
                    <span className="font-semibold">
                        {cartCount} (Items)
                    </span>
                </p>
                <p className="mb-6">
                    Est. total:{' '}
                    <span className="font-semibold">
                        kr {cartSum.toFixed(2)}
                    </span>
                </p>

                <button
                    id="confirm_btn"
                    className="w-3/4 bg-orange-400 hover:bg-teal-900 text-white font-semibold py-2 rounded-2xl">
                    Confirm Order
                </button>
            </div>
        </div>

    </>)
}
export default ConfirmOrder