import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urls";
import type { MyOrderProps, OrderBaseProps, OrderProps } from "../types";

type StockValidationProps = {
    productId: string;
    name: string;
    quantity: number;
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1`, credentials: "include" }),
    endpoints: (builder) => ({
        placeOrder: builder.mutation<{ success: boolean, message: string, order: OrderProps }, { orderData: OrderBaseProps }>({
            query: (body) => ({
                url: '/order/new',
                method: 'POST',
                body
            })
        }),
        validateStock: builder.mutation<{ success: boolean, message: string }, StockValidationProps[]>({
            query: (body) => ({
                url: '/order/validate',
                method: 'POST',
                body
            })
        }),

        myOrders: builder.query<{ success: boolean, orders: MyOrderProps[] }, void>({
            query: () => ({
                url: '/myorders',
                method: 'GET'
            })
        }),
        getOrderById: builder.query<{ success: true, order: MyOrderProps }, { id: string }>({
            query: ({ id }: { id: string }) => `/order/${id}`
        })
    })

})

export const { usePlaceOrderMutation,
    useValidateStockMutation,
    useMyOrdersQuery,
    useGetOrderByIdQuery } = orderApi