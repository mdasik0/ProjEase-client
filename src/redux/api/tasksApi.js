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
      invalidatesTags: ["tasks"],
    }),
    updateStatus: builder.mutation({
      query: (_id) => ({
        url: `/updateTaskStatus/${_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation({
      query: (_id) => ({
        url: `/deleteTasks/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"]
    }),
    addSteps: builder.mutation({
      query: ({_id,body}) => ({
        url: `/createSteps/${_id}`,
        method: "PATCH",
        body: body,
      }), 
      invalidatesTags: ["tasks"]
    }),
    completeSteps: builder.mutation({
      query: ({_id,body}) => ({
        url: `/completeSteps/${_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ['tasks']
    }),
    deleteSteps: builder.mutation({
      query: ({_id,body}) => ({
        url: `/deleteSteps/${_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ['tasks']
    }),
    
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateStatusMutation,
  useDeleteTaskMutation,
  useAddStepsMutation,
  useCompleteStepsMutation,
  useDeleteStepsMutation,
} = tasksApi;

export default tasksApi;
