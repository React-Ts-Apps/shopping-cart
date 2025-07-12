import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urls";
import type { User } from "../types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1`, credentials: 'include' }),
    endpoints: (builder) => ({
        register: builder.mutation<{ user: User }, FormData>({
            query: (formData) => ({
                url: '/register',
                method: 'POST',
                body: formData
            })
        }),
        updateProfile: builder.mutation<{ user: User; success: boolean }, FormData>({
            query: (formData) => ({
                url: '/update/profile',
                method: 'PUT',
                body: formData
            })
        }),
        login: builder.mutation<{ user: User }, { email: string, password: string }>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        forgotPassword: builder.mutation<{ message: string }, { email: string }>({
            query: (body) => ({
                url: '/password/forgot',
                method: 'POST',
                body
            })
        }),
        resetPassword: builder.mutation<{ user: User }, { password: string, confirmPassword: string, token: string | undefined }>({
            query: ({ password, confirmPassword, token }) => ({
                url: `/password/reset/${token}`,
                method: 'POST',
                body: { password, confirmPassword }
            })
        }),
        getCurrentUser: builder.query<{ user: User; success: boolean }, void>({
            query: () => ({
                url: '/me'
            })
        }),
        logout: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: '/logout',
                method: 'GET',
            })
        })
    })
})

export const { useRegisterMutation,
    useUpdateProfileMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetCurrentUserQuery,
    useLogoutMutation } = authApi
