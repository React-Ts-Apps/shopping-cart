import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urls";

//createApi- Create service layer for products api 
//reducerPath - Provides name tobe used in redux state tree
//baseQuery - Start of every endpoint
//builder.query for GET
//builder.mutation for POST/PUT/DELETE
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1` }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products'
        })
    })
})

export const { useGetProductsQuery } = productsApi