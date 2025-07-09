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
        }
    }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer