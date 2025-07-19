import { createSlice } from "@reduxjs/toolkit";
import loadCartFromLocalStorage from "../../../utils/storage";
import type { CartItemProps, ShippingProps } from "../../../types";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromLocalStorage('cart') as CartItemProps[] || [],
        shippingInfo: loadCartFromLocalStorage('shippingInfo') as ShippingProps || {
            address: '',
            city: '',
            postalCode: '',
            phoneNo: '',
            country: '',
        }
    },
    reducers: {
        addToCart: (state, action) => {
            const { _id, quantity, ...rest } = action.payload
            const existingItem = state.items.find(i => i._id === _id)
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                state.items.push({ _id, quantity, ...rest })
            }
        },
        incrementCartItem: (state, action) => {
            const item = state.items.find(i => i._id === action.payload)
            if (item) item.quantity += 1
        },
        decrementCartItem: (state, action) => {
            const item = state.items.find(i => i._id === action.payload)
            if (item) item.quantity -= 1
        },
        deleteCartItem: (state, action) => {
            state.items = state.items.filter(i => i._id !== action.payload)
        },
        updateStock: (state, action) => {
            const { productId, stock } = action.payload
            const item = state.items.find(item => item._id === productId)
            if (item) {
                item.stock = stock;
            }
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload
        },
        clearCart: (state) => {
            state.items = []
        }

    }
})
export const { addToCart,
    incrementCartItem,
    decrementCartItem,
    deleteCartItem,
    updateStock,
    saveShippingInfo,
    clearCart } = cartSlice.actions
export default cartSlice.reducer