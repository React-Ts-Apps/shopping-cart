import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import type { ItemProps } from "../../types";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ReviewStars from "./ReviewStars";

const Card = ({ data }: { data: ItemProps }) => {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(data))
    }

    return (
        <div className="p-4 w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md h-full p-4 flex flex-col">
                {
                    data.images.length > 0 && (
                        <img src={data.images[0].image}
                            alt={data.name}
                            className="w-full h-48 object-contain mb-4" />
                    )
                }
                <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
                    <Link to='/' className="hover:underline">{data.name}</Link>
                </h2>
                <div className="mt-auto">
                    <div className="flex items-center">
                        <ReviewStars ratings={data.ratings} />
                        <span className="text-gray-600 ml-2">({data.numOfReviews} reviews)</span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span className="text-green-600 font-bold text-base" >{data.price}kr</span>
                        <ShoppingCart size={22}
                            className="text-teal-700 hover:text-teal-800 cursor-pointer"
                            onClick={handleAddToCart}
                        />
                    </div>

                    <Link to='/'
                        className="block text-white text-sm text-center w-full py-2 bg-teal-900 hover:bg-teal-800 rounded">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Card