import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { Trash2 } from "lucide-react"
import { decrementCartItem, deleteCartItem, incrementCartItem } from "../../redux/features/cart/cartSlice"
import { cartCountSelector, cartSumSelector } from "../../redux/features/cart/selectors"
import { Link, useNavigate } from "react-router-dom"
import { useTitle } from "../../hooks/useTitle"
import CheckoutGuide from "./CheckoutGuide"
import { showToast } from "../../utils/showToast"
import OrderSummaryBox from "../order/OrderSummary"

const Cart = () => {
    useTitle('Cart Items')
    const items = useSelector((state: RootState) => state.cart.items)
    const cartCount = useSelector(cartCountSelector);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartSum = useSelector(cartSumSelector)

    const checkoutHandler = async () => {
        try {
            navigate('/login?redirects=shipping', { replace: true })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {items.length === 0 ? (
                <h2 className="mt-5 text-center text-xl font-semibold">Your Cart is Empty</h2>
            ) : (
                <>
                    <CheckoutGuide hasItems />
                    <h2 className="mt-5 text-2xl font-bold ml-8">
                        Your Cart has: <b>{cartCount} items</b>
                    </h2>

                    <div className="ml-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map(item => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 border-b border-b-gray-300 pb-3"
                                >
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
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => {
                                                    if (item.quantity - 1 < 1) return
                                                    dispatch(decrementCartItem(item._id))
                                                }}
                                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                readOnly
                                                value={item.quantity}
                                                className={`w-12 text-center border rounded py-1 ${item.quantity > item.stock ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            <button
                                                onClick={() => {
                                                    if (item.quantity + 1 > item.stock) {
                                                        showToast.error(`Only ${item.stock} pieces are available `)
                                                        return
                                                    }
                                                    dispatch(incrementCartItem(item._id))
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {item.quantity + 1 > item.stock && <span className="text-red-700">{`Only ${item.stock} pieces`}</span>}
                                    </div>

                                    {/* Delete Button */}
                                    <Trash2 className="text-red-400"
                                        onClick={() => dispatch(deleteCartItem(item._id))} />
                                </div>
                            ))}
                        </div>

                        {/* Summary - take 1/3 width */}
                        <OrderSummaryBox
                            cartCount={cartCount}
                            cartSum={cartSum}
                            buttonText="Check Out"
                            onClick={checkoutHandler}
                        />
                    </div>
                </>
            )}
        </>
    )

}
export default Cart