import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urls";
import type { User } from "../types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1` }),
    endpoints: (builder) => ({
        login: builder.mutation<{ user: User }, { email: string, password: string }>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        })
    })
})

export const { useLoginMutation } = authApi
