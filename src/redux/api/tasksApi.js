import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: (allTasks) => ({
        url: `/allTasks?ids=${allTasks?.join(",")}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),
    getTasksInit: builder.query({
      query: (_id) => ({
        url: `/getTasksInit/${_id}`,
      }),
      providesTags: ["tasksInit"],
    }),
    createTask: builder.mutation({
      query: ({ _id, taskobj }) => ({
        url: `/createTasks/${_id}`,
        method: "POST",
        body: taskobj,
      }),
      invalidatesTags: ["tasks", "tasksInit"],
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
      invalidatesTags: ["tasks"],
    }),
    addSteps: builder.mutation({
      query: ({ _id, body }) => ({
        url: `/createSteps/${_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["tasks"],
    }),
    completeSteps: builder.mutation({
      query: ({ _id, stepid }) => ({
        url: `/completeSteps/${_id}`,
        method: "PATCH",
        body: { stepid }, // Ensure stepid is sent as an object
      }),
      invalidatesTags: ["tasks"],
    }),
    statusSum: builder.query({
      query: (ids) => ({
        url: `/tasks/status-summary?ids=${ids}`,
      })
    }),
    deleteSteps: builder.mutation({
      query: ({ _id, stepid }) => ({
        url: `/deleteSteps/${_id}`,
        method: "PATCH",
        body: { stepid },
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetTasksInitQuery,
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useUpdateStatusMutation,
  useDeleteTaskMutation,
  useAddStepsMutation,
  useCompleteStepsMutation,
  useDeleteStepsMutation,
  useStatusSumQuery
} = tasksApi;

export default tasksApi;
