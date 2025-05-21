import { ShoppingCart } from "lucide-react"

const NavBar = () => {
    return (
        <nav className="bg-grey shadow-md p-4">
            <div className="container max-auto flex justify-between items-center">
                <div className="text-2xl text-blue-600 font-bold">ShopNest</div>
                <ul className="flex space-x-6 items-center">
                    <li>
                        <span className="cursor-pointer text-gray-800 hover:text-blue-600">Home</span>
                    </li>
                    <li>
                        <span className="cursor-pointer text-gray-800 hover:text-blue-600">Products</span>
                    </li>
                    <li>
                        <div className="relative text-gray-800 cursor-pointer hover:text-blue-600">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )

}
export default NavBar