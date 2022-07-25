import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3300/v1/smart_coders/' }),

  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: 'register',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
            
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: `getUser`,
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    getSkillsList: builder.query({
      query: () => {
        return {
          url: `getUser`,
          method: 'GET',
          headers: {
            'Content-type': `application/json`,
          }
        }
      }
    }),
    updateUser: builder.mutation({
      query: ({uId,token,newData}) => {
        return {
          url: `/updateUser/${uId}`,
          method: 'POST',
          body: newData,
          headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        }
      }
    }),
    addSkills: builder.mutation({
      query: ({uId,token,skillData}) => {
        return {
          url: `/addSkills/${uId}`,
          method: 'POST',
          body: skillData,
          headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        }
      }
    }),
    addProjects: builder.mutation({
      query: ({uId,token,data}) => {
        return {
          url: `/addProjects/${uId}`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        }
      }
    }),
  }),
})

export const { useAddProjectsMutation,useGetSkillsListQuery, useRegisterUserMutation,useAddSkillsMutation,useUpdateUserMutation, useLoginUserMutation, useSendPasswordResetEmailMutation,useGetLoggedUserQuery, useResetPasswordMutation } = userAuthApi