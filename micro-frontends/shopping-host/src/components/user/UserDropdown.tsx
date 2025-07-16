import type { User } from "../../types"
import defaultAvatar from '../../assets/default_avatar.png'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown } from 'lucide-react'

type DropDownProps = {
    user: User;
    logoutHandler: () => void;
}
const UserDropdown = ({ user, logoutHandler }: DropDownProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dropDownRef = useRef<HTMLDivElement>(null)
    const avatarSrc = user.avatar || defaultAvatar

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {

            if (open && dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div ref={dropDownRef} className="relative inline-block text-left" tabIndex={0}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={open}
                aria-haspopup="menu"
            >
                <div className="flex items-center gap-2 cursor-pointer">
                    <img
                        className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                        src={avatarSrc}
                        alt="User avatar"
                    />
                    <span className="text-white font-medium text-sm">{user.name}</span>
                    <ChevronDown className="text-white w-4 h-4" />
                </div>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-teal-700 shadow-lg rounded z-50">
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
                            navigate('/my/orders')
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