import { createSlice } from "@reduxjs/toolkit";

const initialState = {
projectData: {},
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
    storeActiveProject: (state, {payload}) => {
        state.projectData = payload;
    }
    }
})

// active project from userSlice.userData
// then fetch the project
// then store the project in the projectSlice

export const {storeActiveProject} = projectSlice.actions;
export default projectSlice.reducer;