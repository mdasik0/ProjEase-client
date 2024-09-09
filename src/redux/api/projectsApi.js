import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
    reducerPath: 'projects',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (body) => ({
                url: 'createProject',
                method: 'POST',
                body:body,
            })
        }),
        getProject : builder.query({
            query: (_id) => ({
                url: `/getProject/${_id}`,
            })
        })
    })
})

export const {useCreateProjectMutation, useGetProjectQuery} = projectsApi;
export default projectsApi;