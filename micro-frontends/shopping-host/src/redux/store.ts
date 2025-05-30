import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/user/authSlice'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>