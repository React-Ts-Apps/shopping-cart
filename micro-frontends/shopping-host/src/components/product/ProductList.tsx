import Card from "./Card"
import LoadData from "../ui/LoadData"
import type { ItemProps } from "../../types"
import { useTitle } from "../../hooks/useTitle"
import { useGetProductsQuery } from "../../services/productsApi"
import { useEffect, useState } from "react"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchError } from "../../utils/fetchError"
import Paginate from "../ui/Paginate"

const ITEMS_PER_PAGE = 5

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data, error, isLoading } = useGetProductsQuery({ page: currentPage, limit: ITEMS_PER_PAGE })


    useTitle('Home')

    useEffect(() => {
        if (error) {
            fetchError(error as FetchBaseQueryError)
        }
    }, [error])
    if (error) return null
    if (isLoading) return <LoadData message='Render responding...' />

    const pageCount = Math.ceil(data.total / data.limit) || 0

    const handlePageChange = (selected: number) => {
        //react-paginate starts page index 0
        setCurrentPage(selected + 1)
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {data.products.map((product: ItemProps) => (
                    <Card key={product._id} data={product} />
                ))}
            </div>

            {pageCount > 1 ? <div className="flex mt-4 justify-center">
                <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
            </div> : null}
        </div>
    )
}
export default ProductList