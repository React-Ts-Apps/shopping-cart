
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { cartCountSelector } from '../../redux/features/cart/selectors';
import Search from './Search';
import type { RootState } from '../../redux/store';
import UserDropdown from '../user/UserDropdown';
import { resetCredentials } from '../../redux/features/user/authSlice';
import { useLogoutMutation } from '../../services/authApi';
import { showToast } from '../../utils/showToast';


const NavBar = () => {
    const { admin } = useParams<{ admin: string }>();
    const cartCount = useSelector(cartCountSelector);
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch()
    const isRecipesPath = location.pathname.startsWith('/recipes')
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const [logout] = useLogoutMutation()

    const viewCart = () => {
        navigate('/home/cart', { replace: true });
    };

    const showRecipes = () => {
        navigate('/recipes', { replace: true });
    };

    const logoutHandler = async () => {
        try {
            const res = await logout().unwrap()
            dispatch(resetCredentials())
            showToast.success(res.message)
        } catch (error) {
            console.log(error);
            showToast.error('Logout failed')
        }
    }
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
                                        onClick={() => navigate('/home?category=All Products&page=1', { replace: true })}
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
                    {!isRecipesPath && <div>
                        <Search />
                    </div>}
                    {isAuthenticated && user ? <UserDropdown user={user} logoutHandler={logoutHandler} /> :
                        <Link to='/login' className='block bg-orange-400 text-white font-semibold text-sm py-2 px-4 rounded-sm hover:bg-teal-700'>
                            Login
                        </Link>}

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
