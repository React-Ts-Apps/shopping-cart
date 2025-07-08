import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../../services/productsApi"
import { useEffect } from "react"
import { fetchError } from "../../utils/fetchError"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import LoadData from "../ui/LoadData"
import { useTitle } from "../../hooks/useTitle"
import ReviewStars from "../ui/ReviewStars"
import Carousel from "../ui/Carousel"

const ProductDetails = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useGetProductByIdQuery(id || '')
    useTitle(data?.product.name || 'TasteHub')

    useEffect(() => {
        if (error) {
            fetchError(error as FetchBaseQueryError)
        }
    }, [error])
    if (error) return null
    if (isLoading) return <LoadData message='Render responding...' />

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                    <Carousel images={data.product.images} />
                </div>
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                    <h3 className="font-semibold text-2xl text-gray-800 mb-2">{data.product.name}</h3>
                    <p className="text-sm  text-gray-500 mb-4">Product #{data.product._id}</p>

                    <div className="flex items-center gap-2 mb-4">
                        <ReviewStars ratings={data.product.ratings} />
                        <span className="text-gray-600 text-sm">({data.product.numOfReviews} reviews)</span>
                    </div>
                    <hr className=" text-gray-300 my-4" />
                    <p className="text-gray-800 font-bold text-2xl mb-6">{data.product.price} kr</p>

                    <div className="flex items-center gap-2 overflow-hidden">
                        <div>
                            <button className="bg-red-600 text-white px-3 py-2  hover:bg-red-700">
                                -
                            </button>

                            <input
                                type="text"
                                readOnly
                                value={1}
                                className="w-10 text-center  py-1"
                            />

                            <button className="bg-blue-600 text-white px-3 py-2  hover:bg-blue-700">
                                +
                            </button>
                        </div>
                        <button
                            disabled={data.product.stock == 0}
                            onClick={() => alert('hi')}
                            className={`text-white bg-orange-400 rounded px-4 py-2 font-semibold
                            ${data.product.stock == 0 ? 'bg-orange-300 cursor-not-allowed' : ' hover:bg-teal-700'}`}>
                            Add to Cart
                        </button>
                    </div>

                    <p className="pt-3">Status:
                        <span className={`px-2 ${data.product.stock > 0 ? 'text-teal-600' : 'text-red-600'}`}>
                            {data.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </p>
                    <hr className=" text-gray-300 my-4" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Description:</h4>
                    <p className="text-gray-600 leading-relaxed">{data.product.description}</p>

                    <p className="text-gray-700 mt-4">Sold By:
                        <strong className="text-gray-900 px-2">{data.product.seller}</strong>
                    </p>

                    <button
                        className="mt-6 px-4 py-2 bg-orange-400  text-white rounded hover:bg-teal-700 transition"
                    >
                        Submit Your Review
                    </button>
                </div>

            </div >
        </div>
    )
}
export default ProductDetails