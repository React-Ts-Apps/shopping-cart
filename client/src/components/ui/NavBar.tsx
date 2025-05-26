
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const NavBar = () => {
    const { admin } = useParams<{ admin: string }>();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login', { replace: true })
    }

    const handleSignUp = () => {
        navigate('/signup', { replace: true })
    }

    //@space-x-6 adds horizontal space among direct children
    return (
        <nav className="w-full bg-gray-100 shadow-md p-4">
            <div className="container flex items-center">
                <div className="text-2xl text-blue-600 font-bold">ShopNest</div>

                <div className="flex justify-between items-center w-full ml-6">

                    <ul className="flex space-x-6 items-center font-semibold">
                        {admin === 'admin' ? (
                            <li>
                                <span className="cursor-pointer text-gray-800 hover:text-blue-600">Admin Panel</span>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <span onClick={() => { navigate('/home', { replace: true }) }} className="cursor-pointer text-gray-800 hover:text-blue-600">Home</span>
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
                            </>
                        )}
                    </ul>


                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-semibold"
                        >
                            <User className="w-5 h-5" />
                            <span>Account</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-md z-50">
                                <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleSignUp}>Sign Up</div>
                                <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogin}>Login</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
