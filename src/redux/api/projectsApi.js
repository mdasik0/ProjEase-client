import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_BASEURL}`, prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if(token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }}),
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectObj) => ({
        url: "/project",
        method: "POST",
        body: projectObj,
      }),
    }),
    updateProject: builder.mutation({
      query: ({ _id, newObj }) => ({
        url: `/project/${_id}`,
        method: "PATCH",
        body: newObj,
      }),
    }),
    getProject: builder.query({
      query: (_id) => ({
        url: `/getProject/${_id}`,
      }),
    }),
    joinProject: builder.mutation({
      query: (info) => ({
        url: "/join-project",
        method: "POST",
        body: info,
      }),
    }),
    inviteMembers: builder.mutation({
      query: (invitationInfo) => ({
        url: "invite-members",
        method: "POST",
        body: invitationInfo,
      }),
    }),
    getInvitationInfo: builder.query({
      query: (_id) => ({
        url: `/invitation-info/${_id}`,
      }),
    }),
    getChatGroup: builder.query({
      query: (_id) => ({
        url: `/chat-group/${_id}`,
      }),
    }),
    postAnnouncement: builder.mutation({
      query: (data) => ({
        url: `/announcement`,
        method: "POST",
        body: data,
      }),
    }),
    getAnnouncement: builder.query({
      query: (projectId) => ({
        url: `/announcement/${projectId}`,
      }),
    }),
    moreJoinedProjectsInfo: builder.mutation({
      query: (joinedProjects) => ({
        url: "joinedProjectsInfo",
        method: "POST",
        body: joinedProjects,
      }),
    }),
  }),
});

export const {
  useGetAnnouncementQuery,
  usePostAnnouncementMutation,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useJoinProjectMutation,
  useInviteMembersMutation,
  useGetInvitationInfoQuery,
  useMoreJoinedProjectsInfoMutation
} = projectsApi;
export default projectsApi;
