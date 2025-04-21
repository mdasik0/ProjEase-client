import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {
      const skipAuthEndpoints = ["createUser", "emailLogin"];
      const token = localStorage.getItem("authToken");
    
      if (token && !skipAuthEndpoints.includes(endpoint)) {
        headers.set("authorization", `Bearer ${token}`);
      }
    
      return headers;
    },
    
  }),

  tagTypes: ["users"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: "/createUser",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["users"],
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/getUser/${email}`,
      }),
      providesTags: ["users"],
    }),
    getMultiUser: builder.query({
      query: (userIdsArr) => ({
        url: `/getMultUsers?userIds=${userIdsArr?.join(",")}`,
      }),
    }),
    emailLogin: builder.query({
      query: (email) => ({
        url: `/emailLogin/${email}`,
      }),
      invalidatesTags: ["users"],
    }),
    updateName: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/updateName/${_id}`,
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["users"],
    }),
    uploadProfilePicture: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/updateProfilePicture/${_id}`,
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["users"],
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
      query: ({ _id, data }) => ({
        url: `/users/${_id}/joined-projects`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    switchProjectStatus: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/switch-project-status?userId=${userId}&projectId=${projectId}`,
        method: "PATCH",
      }),
    }),
    removeRefreshToken: builder.mutation({
      query: () => ({
        url: `/remove-refresh-token`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useRemoveRefreshTokenMutation,
  useSwitchProjectStatusMutation,
  useCreateUserMutation,
  useGetUserQuery,
  useGetMultiUserQuery,
  useUpdateUserMutation,
  useUpdateNameMutation,
  useUploadProfilePictureMutation,
  useEmailLoginQuery,
  useUpdateJoinedProjectsMutation,
} = userApi;

export default userApi;
