import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false,
};

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: initialState,
    reducers: {
        changeTheme(state) {
            state.isDarkMode = !state.isDarkMode;
        },
    }


});

export const darkModeActions = darkModeSlice.actions;
export default darkModeSlice.reducer;