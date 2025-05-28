import { ShoppingCart } from "lucide-react"
import type { ItemProps } from "../../types"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"

const Card = ({ data }: { data: ItemProps }) => {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(data))
    }

    return (
        <div className="p-4">
            <div className="w-60 rounded-2xl overflow-hidden shadow-md bg-gray-100 p-4 text-center ">
                <img src={data.imgSrc} alt="product" className="w-32 h-32 object-contain mx-auto" />
                <div className="mt-4">
                    <h2 className="text-lg text-gray-800 font-semibold">{data.name}</h2>
                    <p className="text-gray-600 mt-1">{data.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-green-600 font-bold">{data.price}kr</span>
                        <ShoppingCart
                            size={24}
                            className="text-blue-500 cursor-pointer hover:text-blue-600"
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card