import { createSlice } from "@reduxjs/toolkit";

const initialState = {
projectData: {
    _id: '',
},
members: []
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
    storeActiveProject: (state, {payload}) => {
        state.projectData = payload;
    }, 
    storeMembersInfo: (state, {payload}) => {
        state.members = payload;
    },
    resetProjSlice: (state) => {
        state.members = [];
        state.projectData = {};
    }, 
    updateProjectId: (state, {payload}) => {
        state.projectData._id = payload;
    }
    }
})

// active project from userSlice.userData
// then fetch the project
// then store the project in the projectSlice

export const {storeActiveProject, storeMembersInfo,resetProjSlice, updateProjectId} = projectSlice.actions;
export default projectSlice.reducer;