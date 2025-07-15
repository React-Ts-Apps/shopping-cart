import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../redux/store"
import { showToast } from "../utils/showToast"

export const useOrderValidation = () => {
    const navigate = useNavigate()
    const { shippingInfo, items } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.auth)
    const orderInfo = sessionStorage.getItem('orderInfo') ? JSON.parse(sessionStorage.getItem('orderInfo') as string) : null

    const isShippingInComplete = () => !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    return (step: 'shipping' | 'confirm' | 'payment') => {
        if (!user) {
            showToast.error('Please Login first')
            navigate('/login', { replace: true })
        }
        if (items.length == 0) {
            showToast.error('Cart is empty')
            navigate('/home/cart', { replace: true })
        }
        if (step === 'confirm' || step === 'payment') {
            if (isShippingInComplete()) {
                showToast.error('All fields in shipping details required')
                navigate('/shipping', { replace: true })
            }
        }
        if (!orderInfo && step === 'payment') {
            showToast.error('Order must be confirmed')
            navigate('/confirm/order', { replace: true })
        }
    }
}