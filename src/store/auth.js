import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    payload: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            if (!action || !action.payload) {
                return
            }
            state.isLoggedIn = true;
            state.payload = action.payload;
        },
        logOut(state) {
            state.isLoggedIn = false;
            state.payload = null;
        },
    },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;