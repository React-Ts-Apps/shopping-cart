import { Link, useParams } from "react-router-dom"
import { useAddReviewMutation, useGetProductByIdQuery } from "../../services/productsApi"
import { useEffect, useState } from "react"
import { fetchError } from "../../utils/fetchError"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import LoadData from "../ui/LoadData"
import { useTitle } from "../../hooks/useTitle"
import ReviewStars from "../ui/ReviewStars"
import Carousel from "../ui/Carousel"
import LoadFail from "../ui/LoadFail"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { showToast } from "../../utils/showToast"
import type { RootState } from "../../redux/store"

const ProductDetails = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState<number>(1)
    const { data, isLoading, error } = useGetProductByIdQuery(id || '')
    const [addReview] = useAddReviewMutation()
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    useTitle(data?.product.name || 'TasteHub')
    const { user } = useSelector((state: RootState) => state.auth)
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

    const handleClick = (ratings: number) => {
        setRating(ratings)
    }

    const reviewHandler = async () => {
        if (!rating || !id) {
            showToast.error('Provide rating')
            return
        }
        const reviewData = {
            rating,
            comment: review,
            date: new Date(Date.now()),
            productId: id
        }
        try {
            const res = await addReview({ ...reviewData }).unwrap()
            showToast.success(res.message)
            setShowModal(false)
        } catch (e) {
            console.log(e)
            showToast.error('Submission failed')
        }

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
                            ${isDisabled ? 'bg-gray-400' : 'bg-orange-400  hover:bg-teal-700 active:scale-80 transition-all duration-150'}`}>
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
                    {user ? (
                        <button onClick={() => setShowModal(true)}
                            className="mt-6 w-full max-w-sm px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-300"
                        >
                            Write Your Review
                        </button>
                    ) : (
                        <div className="mt-6 w-full max-w-sm bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded shadow-sm" role="alert">
                            <strong className="font-medium">
                                <Link to="/login" className="hover:underline hover:text-yellow-900">
                                    Login to Post Review
                                </Link>
                            </strong>
                        </div>
                    )}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                <div className="flex justify-between items-center border-b pb-2 mb-4">
                                    <h2 className="text-lg font-semibold">Write Review</h2>
                                    <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
                                </div>

                                <ul className="flex space-x-2 justify-center mb-4">
                                    <ReviewStars ratings={rating} handleClick={handleClick} />
                                </ul>

                                <textarea
                                    onChange={(e) => setReview(e.target.value)} className="w-full border rounded p-2 text-sm resize-none focus:ring-2 focus:ring-teal-500"
                                    rows={4}
                                    value={review}
                                    placeholder="Write your review here..."
                                ></textarea>

                                <div className="mt-4 text-right">
                                    <button onClick={reviewHandler}
                                        className="px-4 py-2 bg-orange-400 hover:bg-teal-900 rounded text-white transition ">
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div >
        </div>
    )
}
export default ProductDetails