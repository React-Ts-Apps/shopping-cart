import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'
import authReducer from './features/user/authSlice'
import { productsApi } from "../services/productsApi";
import { authApi } from "../services/authApi";

const reducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().
        concat(productsApi.middleware).
        concat(authApi.middleware)
})

store.subscribe(() => {
    const cartState = store.getState().cart.items;
    localStorage.setItem('cart', JSON.stringify(cartState));
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch