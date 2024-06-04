import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ['TaskUpdate'],
  endpoints: (builder) => ({
    getTasks: builder.query({
        query: () => "/tasks",
        providesTags:['TaskUpdate']
    }),
    updateStatus: builder.mutation({
      query: (_id) => ({
        url : `/updateTaskStatus/${_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['TaskUpdate']
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url : ``,
        method: "POST",
        body:body
      })}
    })
  })
})

export const { useGetTasksQuery, useUpdateStatusMutation } = tasksApi

export default tasksApi;
