import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { Trash2 } from "lucide-react"
import { decrementCartItem, deleteCartItem, incrementCartItem } from "../../redux/features/cart/cartSlice"
import { cartCountSelector, cartSumSelector } from "../../redux/features/cart/selectors"
import { Link } from "react-router-dom"
import { useTitle } from "../../hooks/useTitle"

const Cart = () => {
    useTitle('Cart')
    const items = useSelector((state: RootState) => state.cart.items)
    const cartCount = useSelector(cartCountSelector);
    const dispatch = useDispatch()
    const cartSum = useSelector(cartSumSelector)

    return (
        <>
            {items.length === 0 ? (
                <h2 className="mt-5 text-center text-xl font-semibold">Your Cart is Empty</h2>
            ) : (
                <>
                    <h2 className="mt-5 text-2xl font-bold ml-8">
                        Your Cart has: <b>{cartCount} items</b>
                    </h2>

                    <div className="ml-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl">
                        {/* Cart Items - take 2/3 width */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map(item => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 border-b border-b-gray-300 pb-3"
                                >
                                    {/* Image */}
                                    <div className="w-20 flex-shrink-0">
                                        <img
                                            src={item.images[0].image}
                                            alt={item.name}
                                            className="h-20 w-full object-cover rounded"
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="flex-1 min-w-[100px]">
                                        <Link
                                            to={`/product/${item._id}`}
                                            className="text-teal-600 hover:underline font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    </div>

                                    {/* Price */}
                                    <div className="w-16 text-center text-gray-800 font-medium flex-shrink-0">
                                        kr {item.price}
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => dispatch(decrementCartItem(item._id))}
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            readOnly
                                            value={item.quantity}
                                            className="w-12 text-center border border-gray-300 rounded py-1"
                                        />
                                        <button
                                            onClick={() => dispatch(incrementCartItem(item._id))}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Delete Button */}
                                    <Trash2 className="text-red-400"
                                        onClick={() => dispatch(deleteCartItem(item._id))} />
                                </div>
                            ))}
                        </div>

                        {/* Summary - take 1/3 width */}
                        <div className="p-6 border border-gray-300 rounded shadow-lg pl-8 font-serif h-fit bg-white">
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
                                    kr {cartSum}
                                </span>
                            </p>

                            <button
                                id="checkout_btn"
                                onClick={() => alert('checkoutHandler')}
                                className="w-full bg-orange-400 hover:bg-teal-900 text-white font-semibold py-2 rounded"
                            >
                                Check out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )

}
export default Cart