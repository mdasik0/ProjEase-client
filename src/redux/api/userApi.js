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
      providesTags: ['users']
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/getUser/${email}`,
      }),
      providesTags: ['users']
    }),
    emailLogin: builder.query({
      query: (email) => ({
        url: `/emailLogin/${email}`,
      }),
      providesTags: ['users']
    }),
    updateName: builder.mutation({
      query: ({_id,data}) => ({
        url: `/updateName/${_id}`,
        method:'PATCH',
        body:{data}
      }),
      invalidatesTags: ['users']
    }),
    uploadProfilePicture: builder.mutation({
      query: ({_id,data}) => ({
        url: `/updateProfilePicture/${_id}`,
        method: 'PATCH',
        body: {data},
      }),
      invalidatesTags: ['users']
    }),
    updateUser: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/updateUser/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),    
    updateJoinedProjects: builder.mutation({
      query: ({_id,data}) => ({
        url: `/users/${_id}/joined-projects`,
        method: 'PATCH',
        body: data,
      })
    })
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateNameMutation,
  useUploadProfilePictureMutation,
  useAddProjectsQuery,
  useEmailLoginQuery,
  useUpdateJoinedProjectsMutation
} = userApi;

export default userApi;
