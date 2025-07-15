import { useSelector } from "react-redux"
import { useTitle } from "../../hooks/useTitle"
import CheckoutGuide from "./CheckoutGuide"
import type { RootState } from "../../redux/store"
import { Link, useNavigate } from "react-router-dom"
import { cartCountSelector, cartSumSelector } from "../../redux/features/cart/selectors"
import { SHIPPING_PRICE } from "../../constants"

const ConfirmOrder = () => {
    useTitle('Confirm Order')
    const { user } = useSelector((state: RootState) => state.auth)
    const { shippingInfo, items } = useSelector((state: RootState) => state.cart)
    const cartCount = useSelector(cartCountSelector);
    const cartSum = useSelector(cartSumSelector)
    const navigate = useNavigate()
    const shippingPrice = cartSum > 699 ? 0 : SHIPPING_PRICE
    const taxValue = +(cartSum * 0.05)
    const totalPrice = +(cartSum + shippingPrice + taxValue)

    const paymentHandler = () => {
        const data = {
            itemsPrice: cartSum,
            shippingPrice,
            taxValue,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment', { replace: true })
    }

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
            <div className="p-6 mt-20 border border-gray-300 text-center rounded shadow-lg pl-8 font-serif h-fit bg-white max-w-sm">
                <h4 className="text-xl font-semibold mb-6 text-left">Order Summary</h4>
                <hr className="border-gray-300 mb-6" />

                {/* Subtotal */}
                <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{cartCount} Items</span>
                </div>

                {/* Estimated Total */}
                <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-600">Est. total:</span>
                    <span className="font-semibold">kr {cartSum.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold">kr {shippingPrice.toFixed(2)}</span>
                </div>

                {/* VAT */}
                <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-600">VAT:</span>
                    <span className="font-semibold">kr {taxValue.toFixed(2)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6 text-base">
                    <span className="text-gray-700 font-semibold">Total:</span>
                    <span className="text-lg font-bold text-teal-800">kr {totalPrice.toFixed(2)}</span>
                </div>

                <button
                    id="confirm_btn"
                    onClick={paymentHandler}
                    className="w-3/4 bg-orange-400 hover:bg-teal-900 text-white font-semibold py-2 rounded-2xl">
                    Proceed To Payment
                </button>
            </div>

        </div>

    </>)
}
export default ConfirmOrder