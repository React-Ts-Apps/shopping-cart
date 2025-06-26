import Card from "./Card"
import LoadData from "../ui/LoadData"
import type { ItemProps } from "../../types"
import { useTitle } from "../../hooks/useTitle"
import { useGetProductsQuery } from "../../services/productsApi"
import { useEffect } from "react"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchError } from "../../utils/fetchError"
import Paginate from "../ui/Paginate"
import { useNavigate, useSearchParams } from "react-router-dom"

const ITEMS_PER_PAGE = 5

const ProductList = () => {
    useTitle('Home')

    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const navigate = useNavigate()

    const { data, error, isLoading } = useGetProductsQuery({ keyword, page, limit: ITEMS_PER_PAGE })

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
        searchParams.set('page', String(selected + 1))
        navigate(`/home?${searchParams.toString()}`)
    }

    return (
        <div>
            {data.products.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">No products found.</div>
            ) : (
                <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {data.products.map((product: ItemProps) => (
                        <Card key={product._id} data={product} />
                    ))}
                </div>
            )}
            {pageCount > 1 ? <div className="flex mt-4 justify-center">
                <Paginate pageCount={pageCount} onPageChange={handlePageChange} />
            </div> : null}
        </div>
    )
}
export default ProductList