import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
    reducerPath: 'projects',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (projectObj) => ({
                url: '/createProject',
                method: 'POST',
                body:projectObj,
            })
        }),
        updateProject: builder.mutation({
            query: ({_id, newObj}) => ({
                url: `/updateProject/${_id}`,
                method: 'PATCH',
                body: newObj
            })
        }),
        getProject : builder.query({
            query: (_id) => ({
                url: `/getProject/${_id}`,
            })
        }),
        getTasksInit: builder.query({
            query: (_id) => ({
                url: `/getTasksInit/${_id}`,
            })
        })
    })
})

export const {useGetProjectQuery, useGetTasksInitQuery ,useCreateProjectMutation,  useUpdateProjectMutation} = projectsApi;
export default projectsApi;