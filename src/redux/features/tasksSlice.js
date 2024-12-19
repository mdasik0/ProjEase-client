import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes : "",
    tasksInitial: {},
    allTasks: [],
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
        },
        resetTaskSlice: (state) => {
            state.tasksInitial = {};
            state.allTasks = [];
        }
    },
})

export const { themeChange, updateTaskInit, resetTaskSlice } = tasksSlice.actions;

export default tasksSlice.reducer;