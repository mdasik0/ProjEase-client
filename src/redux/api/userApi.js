import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes:["users"],
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
        url: `/getUser/${email}`,
      }),
      providesTags: ['users']
    }),
    updateUser: builder.mutation({
      query: ({_id,data}) => ({
        url: `/updateUser/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['users']
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
