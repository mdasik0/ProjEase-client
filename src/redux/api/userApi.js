// import { createApi } from '@reduxjs/toolkit/query/react'

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
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/query",
        method: "PATCH",
        body: body,
      }),
    }),
    addProjects: builder.query({
      query: (body) => ({
        url: "somehting",
        method: "PATCH",
        body: body,
      }),
    }),
    
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useAddProjectsQuery,
} = userApi;

export default userApi;
