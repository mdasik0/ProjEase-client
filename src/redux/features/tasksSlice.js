import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes : "",
    tasksInitial: {},
    allTasks: {},
}

const tasksSlice = createSlice({
    name: "tasksSlice",
    initialState,
    reducers: {
        themeChange:(state, {payload}) => {
            state.themes = payload;
        },
        updateTaskInit: (state, {payload}) => {
            state.tasksInitial = payload;
        }
    },
})

export const { themeChange, updateTaskInit } = tasksSlice.actions;

export default tasksSlice.reducer;