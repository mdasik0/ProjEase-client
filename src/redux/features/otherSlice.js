import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes : "",
}

const otherSlice = createSlice({
    name: "otherSlice",
    initialState,
    reducers: {
        themeChange:(state, {payload}) => {
            state.themes = payload;
        }
    },
})

export const { themeChange } = otherSlice.actions;

export default otherSlice.reducer;