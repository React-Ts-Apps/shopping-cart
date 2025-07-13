import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { Link } from "react-router-dom"
import defaultAvatar from '../../assets/default_avatar.png'

const UserProfile = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
    return (

        <div className="flex flex-col font-serif md:flex-row justify-center gap-10 mt-10 px-4">
            {isAuthenticated ?
                (<><div className="flex flex-col items-center w-full ">
                    <figure className="w-32 h-32 mb-6">
                        <img
                            src={user?.avatar || defaultAvatar}
                            alt="User Avatar"
                            className="rounded-full w-full h-full object-cover border border-gray-300 shadow" />
                    </figure>
                    <Link
                        to="/profile/update"
                        className="px-6 py-2 bg-orange-400 text-white rounded hover:bg-teal-900 transition"
                    >
                        Edit Profile
                    </Link>
                </div><div className="w-full  space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700">Full Name</h4>
                            <p className="text-gray-900">{user?.name}</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-700">Email Address</h4>
                            <p className="text-gray-900">{user?.email}</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-700">Joined</h4>
                            <p className="text-gray-900">{String(user?.createdAt).substring(0, 10)}</p>
                        </div>

                        <div className="flex flex-col items-start space-y-3 text-center md:items-stretch gap-3 pt-4">
                            <Link
                                to="/orders"
                                className="px-6 py-2 w-60 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                My Orders
                            </Link>
                            <Link
                                to="/password/update"
                                className="px-6 py-2 w-60 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Change Password
                            </Link>
                        </div>
                    </div></>) : (
                    <p>No profile found.</p>
                )}
        </div >
    );
}
export default UserProfile