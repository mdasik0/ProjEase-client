import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getTasks: builder.query({
        query: () => "/tasks"
    }),
    updateStatus: builder.mutation({
      query: (_id) => ({
        url : `/tasks/${_id}`,
        method: "PATCH",
      })
    })
  })
})

export const { useGetTasksQuery, useUpdateStatusMutation } = tasksApi

export default tasksApi;
