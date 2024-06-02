import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes : "",
}

const tasksSlice = createSlice({
    name: "tasksSlice",
    initialState,
    reducers: {
        themeChange:(state, {payload}) => {
            state.themes = payload;
        }
    },
})

export const { themeChange } = tasksSlice.actions;

export default tasksSlice.reducer;