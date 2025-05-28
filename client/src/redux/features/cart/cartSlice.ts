import { createSlice } from "@reduxjs/toolkit";
import type { CartItemProps } from "../../../types";

const initialState: { items: CartItemProps[] } = { items: [] }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existingItem = state.items.find(i => i._id === item._id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...item, quantity: 1 })
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
        clearCart: (state) => {
            state.items = []
        }

    }
})
export const { addToCart,
    incrementCartItem,
    decrementCartItem,
    deleteCartItem,
    clearCart } = cartSlice.actions
export default cartSlice.reducer