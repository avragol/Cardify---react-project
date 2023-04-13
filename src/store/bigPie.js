import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./DarkMode";
import authReducer from "./auth";

const store = configureStore({
    reducer: {
        darkModeSlice: darkModeReducer,
        authSlice: authReducer,
    },
});

export default store;