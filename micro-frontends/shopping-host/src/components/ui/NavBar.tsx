
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { logOut } from '../../redux/features/user/authSlice';
import { cartCountSelector } from '../../redux/features/cart/selectors';

const NavBar = () => {
    const { admin } = useParams<{ admin: string }>();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartCount = useSelector(cartCountSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogin = () => {
        setIsDropdownOpen(false);
        navigate('/login', { replace: true });
    };

    const handleSignUp = () => {
        setIsDropdownOpen(false);
        navigate('/signup', { replace: true });
    };

    const handleLogOut = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        dispatch(logOut());
    };

    const viewCart = () => {
        navigate('/home/cart', { replace: true });
    };

    const showRecipes = () => {
        navigate('/recipes', { replace: true });
    };

    return (
        <nav className="w-full bg-teal-900 shadow-md p-4">
            <div className="container flex items-center">
                <div className="text-2xl text-orange-300 font-bold">TasteHub</div>

                <div className="flex justify-between items-center w-full ml-6">
                    <ul className="flex space-x-6 items-center font-semibold">
                        {admin === 'admin' ? (
                            <li>
                                <span className="cursor-pointer text-white hover:text-orange-300">Admin Panel</span>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <span
                                        onClick={() => navigate('/home', { replace: true })}
                                        className="cursor-pointer text-white hover:text-orange-300"
                                    >
                                        Home
                                    </span>
                                </li>
                                <li onClick={showRecipes}>
                                    <span className="cursor-pointer text-white hover:text-orange-300">Recipes</span>
                                </li>
                                <li onClick={viewCart}>
                                    <div className="relative text-white cursor-pointer hover:text-orange-300">
                                        <ShoppingCart className="w-6 h-6" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className="flex items-center space-x-2 text-white hover:text-orange-300 font-semibold"
                        >
                            <User className="w-5 h-5" />
                            <span className="hover:cursor-pointer">{user ? user.name : 'Account'}</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-teal-800 text-white border border-teal-700 rounded shadow-md z-50">
                                {user ? (
                                    <div className="py-2 px-4 hover:bg-teal-700 cursor-pointer" onClick={handleLogOut}>
                                        Log Out
                                    </div>
                                ) : (
                                    <>
                                        <div className="py-2 px-4 hover:bg-teal-700 cursor-pointer" onClick={handleLogin}>
                                            Log In
                                        </div>
                                        <div className="py-2 px-4 hover:bg-teal-700 cursor-pointer" onClick={handleSignUp}>
                                            Sign Up
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
