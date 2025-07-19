import { useSelector } from "react-redux"
import { useTitle } from "../../hooks/useTitle"
import CheckoutGuide from "./CheckoutGuide"
import type { RootState } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { cartCountSelector, cartSumSelector } from "../../redux/features/cart/selectors"
import { SHIPPING_PRICE } from "../../constants"
import { useEffect } from "react"
import { useOrderValidation } from "../../hooks/useOrderValidation"
import OrderItems from "../order/OrderItems"
import OrderSummaryBox from "../order/OrderSummary"

const ConfirmOrder = () => {
    useTitle('Confirm Order')
    const { user } = useSelector((state: RootState) => state.auth)
    const { shippingInfo, items } = useSelector((state: RootState) => state.cart)
    const cartCount = useSelector(cartCountSelector);
    const cartSum = useSelector(cartSumSelector)
    const navigate = useNavigate()
    const validateOrder = useOrderValidation()

    const shippingPrice = cartSum > 699 ? 0 : SHIPPING_PRICE
    const taxValue = +(cartSum * 0.05)
    const totalPrice = +(cartSum + shippingPrice + taxValue)

    const orderItems = items.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.images[0].image
    }))


    useEffect(() => {
        validateOrder('confirm')
    })

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
                <OrderItems data={orderItems || []} />
            </div>
            <OrderSummaryBox
                cartCount={cartCount}
                cartSum={cartSum - taxValue}
                shippingPrice={shippingPrice}
                taxValue={taxValue}
                totalPrice={totalPrice}
                showBreakdown
                buttonText="Proceed To Payment"
                onClick={paymentHandler}
            />
        </div>
    </>)
}
export default ConfirmOrder