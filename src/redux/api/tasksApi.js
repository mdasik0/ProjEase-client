import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["tasks"],
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: `/createTasks`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["tasks"]
    }),
    updateStatus: builder.mutation({
      query: (_id) => ({
        url: `/updateTaskStatus/${_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {useCreateTaskMutation, useGetTasksQuery, useUpdateStatusMutation } = tasksApi;

export default tasksApi;
