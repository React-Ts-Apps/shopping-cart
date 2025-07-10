import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types";

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        resetCredentials: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const { setCredentials, resetCredentials } = authSlice.actions
export default authSlice.reducer