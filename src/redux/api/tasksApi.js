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
    createTask: builder.mutation({
      query: ({_id, taskobj}) => ({
        url: `/createTasks/${_id}`,
        method: "POST",
        body: taskobj,
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
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useUpdateStatusMutation,
  useDeleteTaskMutation,
  useAddStepsMutation,
  useCompleteStepsMutation,
  useDeleteStepsMutation,
} = tasksApi;

export default tasksApi;
