import Card from "./Card"
import LoadData from "../ui/LoadData"
import type { ItemProps } from "../../types"
import { useTitle } from "../../hooks/useTitle"
import { useGetProductsQuery } from "../../services/productsApi"
import { useEffect } from "react"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchError } from "../../utils/fetchError"

const ProductList = () => {
    const { data, error, isLoading } = useGetProductsQuery({})
    useTitle('Home')

    useEffect(() => {
        if (error) {
            fetchError(error as FetchBaseQueryError)
        }
    }, [error])
    if (error) return null
    if (isLoading) return <LoadData message='Render responding...' />
    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {data.products.map((product: ItemProps) =>
                    <Card key={product._id} data={product} />
                )}
            </div>

        </div>)
}
export default ProductList