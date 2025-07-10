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
        login: builder.mutation<{ user: User }, { email: string, password: string }>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        getCurrentUser: builder.query<{ user: User; success: boolean }, void>({
            query: () => ({
                url: '/me'
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } = authApi
