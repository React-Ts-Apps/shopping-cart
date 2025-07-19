import { useDispatch } from "react-redux"
import { useValidateStockMutation } from "../services/orderApi"
import type { CartItemProps } from "../types"
import { updateStock } from "../redux/features/cart/cartSlice"
import { showToast } from "../utils/showToast"

export const useValidateStock = () => {
    const [validateStock] = useValidateStockMutation()
    const dispatch = useDispatch()
    return async (items: CartItemProps[]) => {
        try {
            const stockData = items.map(item => ({
                productId: item._id,
                name: item.name,
                quantity: item.quantity
            }))
            await validateStock(stockData).unwrap()
        } catch (error) {
            const stockList = typeof error == 'object' &&
                error != null &&
                'data' in error ? (error.data as { stockList: { _id: string, stock: number }[] }).stockList : []

            stockList.forEach((element: { _id: string, stock: number }) => {
                dispatch(updateStock({ productId: element._id, stock: element.stock }))
            });
            showToast.error('Stock validation failed');
            throw new Error()
        }
    }
}