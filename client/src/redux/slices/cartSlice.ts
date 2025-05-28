import { createSlice } from "@reduxjs/toolkit";
import type { CartItemProps } from "../../types";

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
        }
    }
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer