import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: "/createUser",
        method: "POST",
        body: body,
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/getUser`,
        params: { email }, // Add email as a query parameter
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/query",
        method: "PATCH",
        body: body,
      }),
    }),
    addProjects: builder.query({
      query: (body) => ({
        url: "something",
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useAddProjectsQuery,
} = userApi;

export default userApi;
