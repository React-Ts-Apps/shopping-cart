import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../../services/productsApi"
import { useEffect, useState } from "react"
import { fetchError } from "../../utils/fetchError"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import LoadData from "../ui/LoadData"
import { useTitle } from "../../hooks/useTitle"
import ReviewStars from "../ui/ReviewStars"
import Carousel from "../ui/Carousel"
import LoadFail from "../ui/LoadFail"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { showToast } from "../../utils/showToast"

const ProductDetails = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState<number>(1)
    const { data, isLoading, error } = useGetProductByIdQuery(id || '')
    useTitle(data?.product.name || 'TasteHub')
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            fetchError(error as FetchBaseQueryError)
        }
    }, [error])

    if (error) return <LoadFail />
    if (isLoading) return <LoadData message='Render responding...' />

    const { product } = data

    const isDisabled = product.stock === 0

    const increaseQuantity = () => {
        if (quantity + 1 > product.stock) return
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = () => {
        if (quantity === 1) return
        setQuantity(prev => prev - 1)
    }

    const handleCart = () => {
        dispatch(addToCart({ ...product, quantity }))
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                    <Carousel images={product.images} />
                </div>
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                    <h3 className="font-semibold text-2xl text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm  text-gray-500 mb-4">Product #{product._id}</p>

                    <div className="flex items-center gap-2 mb-4">
                        <ReviewStars ratings={product.ratings} />
                        <span className="text-gray-600 text-sm">({product.numOfReviews} reviews)</span>
                    </div>
                    <hr className=" text-gray-300 my-4" />
                    <p className="text-gray-800 font-bold text-2xl mb-6">{product.price} kr</p>

                    <div className="flex items-center gap-2 overflow-hidden mb-4">
                        {!isDisabled && <div>
                            <button
                                onClick={decreaseQuantity}
                                className="bg-red-600 text-white px-3 py-2  hover:bg-red-700">
                                -
                            </button>

                            <input
                                type="text"
                                readOnly
                                value={quantity}
                                className="w-10 text-center  py-1"
                            />

                            <button
                                onClick={increaseQuantity}
                                className="bg-blue-600 text-white px-3 py-2  hover:bg-blue-700">
                                +
                            </button>
                        </div>}
                        <button
                            onClick={isDisabled ? () => showToast.success('Email will be sent when available') : handleCart}
                            className={`text-white rounded px-4 py-2 font-semibold
                            ${isDisabled ? 'bg-gray-400' : 'bg-orange-400  hover:bg-teal-700'}`}>
                            {isDisabled ? 'Notify Me' : 'Add To Cart'}
                        </button>
                    </div>

                    <p className="pt-3">Status:
                        <span className={`px-2 ${isDisabled ? 'text-red-600' : 'text-gray-500'}`}>
                            {isDisabled ? 'Out of Stock' : `${product.stock} In Stock`}
                        </span>
                    </p>
                    <hr className=" text-gray-300 my-4" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Description:</h4>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <p className="text-gray-700 mt-4">Sold By:
                        <strong className="text-gray-900 px-2">{product.seller}</strong>
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