import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urls";
import type { OrderBaseProps, OrderProps } from "../types";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1`, credentials: "include" }),
    endpoints: (builder) => ({
        placeOrder: builder.mutation<{ success: boolean, message: string, order: OrderProps },
            { orderData: OrderBaseProps }>({
                query: (body) => ({
                    url: '/order/new',
                    method: 'POST',
                    body
                })
            })
    })

})

export const { usePlaceOrderMutation } = orderApi