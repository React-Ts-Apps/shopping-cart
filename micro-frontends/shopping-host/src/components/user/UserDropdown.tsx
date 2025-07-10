import type { User } from "../../types"
import defaultAvatar from '../../assets/default_avatar.png'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type DropDownProps = {
    user: User;
    logoutHandler: () => void;
}
const UserDropdown = ({ user, logoutHandler }: DropDownProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const avatarSrc = user.avatar || defaultAvatar

    return (
        <div className="relative inline-block text-left">
            <button onClick={() => setOpen(!open)} className="flex space-x-2 items-center">
                <img className="w-9 h-9 rounded-full border border-gray-300 object-cover" src={avatarSrc} />
                <span className="text-white font-medium text-sm focus:outline-none">{user.name}</span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-teal-700 shadow-lg rounded ">
                    {user.role === 'admin' &&
                        <button
                            onClick={() => {
                                navigate('/admin/dashboard')
                                setOpen(false)
                            }}
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
                            Dashboard
                        </button>}
                    <button
                        onClick={() => {
                            navigate('/profile')
                            setOpen(false)
                        }}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
                        Profile
                    </button>
                    <button
                        onClick={() => {
                            navigate('/orders')
                            setOpen(false)
                        }}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
                        Orders
                    </button>
                    <button
                        onClick={() => {
                            logoutHandler()
                            setOpen(false)
                        }}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
                        Logout
                    </button>
                </div>
            )}
        </div>)
}
export default UserDropdown