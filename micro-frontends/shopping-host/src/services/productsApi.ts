import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urls";
import type { ReviewProps } from "../types";

type ReviewSubmitProps = ReviewProps & { productId: string }

//createApi- Create service layer for products api 
//reducerPath - Provides name tobe used in redux state tree
//baseQuery - Start of every endpoint
//builder.query for GET
//builder.mutation for POST/PUT/DELETE
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1` }),
    tagTypes: ['Product'], // Define the tag type explicitly
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page = 1, limit = 5, keyword, price, category, ratings }) => {
                let queryString = `/products?page=${page}&limit=${limit}`;
                if (keyword.trim()) queryString += `&keyword=${keyword}`
                if (price) queryString += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
                if (category.trim()) queryString += `&category=${category}`
                if (ratings != null) queryString += `&ratings[gte]=${ratings}`
                return queryString
            }
        }),
        getProductById: builder.query({
            query: (id: string) => `/product/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Product', id }]
        }),

        addReview: builder.mutation<{ sucess: true, message: string }, ReviewSubmitProps>({
            query: (body) => ({
                url: '/review',
                body,
                method: 'PUT',
                credentials: 'include'
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Product', id: arg.productId }],
        })

    })
})

export const { useGetProductsQuery,
    useGetProductByIdQuery,
    useAddReviewMutation
} = productsApi