import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
    reducerPath: 'projects',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (projectObj) => ({
                url: '/project',
                method: 'POST',
                body:projectObj,
            })
        }),
        updateProject: builder.mutation({
            query: ({_id, newObj}) => ({
                url: `/project/${_id}`,
                method: 'PATCH',
                body: newObj
            })
        }),
        getProject : builder.query({
            query: (_id) => ({
                url: `/getProject/${_id}`,
            })
        }),
        joinProject : builder.mutation({
            query: (info) => ({
                url: '/join-project',
                method: 'POST',
                body: info,
            })
        }),
        inviteMembers : builder.mutation({
            query: (invitationInfo) => ({
                url: 'invite-members',
                method: 'POST',
                body: invitationInfo
            })
        }),
        getInvitationInfo : builder.query({
            query: (_id) => ({
                url: `/invitation-info/${_id}`,
            })
        }),
        getChatGroup: builder.query({
            query: (_id) => ({
                url: `/chat-group/${_id}`
            })
        })
        
    })
})

export const {useGetProjectQuery ,useCreateProjectMutation,  useUpdateProjectMutation, useJoinProjectMutation, useInviteMembersMutation, useGetInvitationInfoQuery, useGetChatGroupQuery} = projectsApi;
export default projectsApi;