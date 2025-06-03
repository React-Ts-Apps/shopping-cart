import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { CirclePlus, CircleMinus, Trash2 } from "lucide-react"
import { clearCart, decrementCartItem, deleteCartItem, incrementCartItem } from "../../redux/features/cart/cartSlice"
import { cartSumSelector } from "../../redux/features/cart/selectors"
import { Tooltip } from 'react-tooltip'
import { Link } from "react-router-dom"

const CartView = () => {
    const items = useSelector((state: RootState) => state.cart.items)
    const dispatch = useDispatch()
    const cartSum = useSelector(cartSumSelector)

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">{
            items.length === 0 ? <p>
                Your Cart is empty. <Link to='/home'><span className="text-blue-600 underline font-semibold">Click here</span></Link> to add items
            </p> :
                <>
                    <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>

                    <table className="w-full table-auto border-collapse shadow-sm">
                        <thead>
                            <tr className="bg-gray-200 text-left">

                                <th colSpan={2} className="px-4 py-3">Item</th>
                                <th className="px-4 py-3">Quantity</th>
                                <th className="px-4 py-3">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <img src={item.imgSrc} className="w-6 h-6" />
                                    </td>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3 flex flex-row gap-2">
                                        <CircleMinus className="text-gray-500 hover:cursor-pointer"
                                            onClick={() => dispatch(decrementCartItem(item._id))} />
                                        {item.quantity}
                                        <CirclePlus className="text-gray-500 hover:cursor-pointer"
                                            onClick={() => dispatch(incrementCartItem(item._id))} /></td>
                                    <td className="px-4 py-3 text-red-700 font-semibold">kr {(item.quantity * item.price).toFixed(2)}</td>
                                    <td><Trash2 className="text-red-400"
                                        onClick={() => dispatch(deleteCartItem(item._id))} /></td>
                                </tr>
                            ))}
                            <tr><td className="px-4 py-3 text-red-700 font-semibold" colSpan={3}>Total:</td>
                                <td className="px-4 py-3 text-orange-700 font-semibold"> kr {cartSum.toFixed(2)}</td>
                                <td><Trash2 data-tooltip-id='cart-empty' data-tooltip-content="Empty cart" className="text-gray-400 hover:text-red-500 cursor-pointer"
                                    onClick={() => dispatch(clearCart())} />
                                    <Tooltip id='cart-empty' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>}
        </div>
    )
}
export default CartView