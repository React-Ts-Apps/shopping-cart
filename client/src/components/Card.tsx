import { ShoppingCart } from "lucide-react"

const Card = () => {
    return (
        <div className="p-4">
            <div className="w-60 rounded-2xl overflow-hidden shadow-md bg-white p-4 text-center ">
                <img src="https://www.themealdb.com/images/ingredients/lime-small.png" alt="product" />
                <div className="mt-4">
                    <h2 className="text-lg text-gray-800 font-semibold">Product Name</h2>
                    <p className="text-gray-600 mt-1">Short Description</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-green-600 font-bold">200kr</span>
                        <ShoppingCart
                            size={24}
                            className="text-blue-500 cursor-pointer hover:text-blue-600"
                            onClick={() => console.log('Item added')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card