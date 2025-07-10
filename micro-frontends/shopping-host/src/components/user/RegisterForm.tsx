import { useEffect, useState, type FormEvent } from "react";
import defaultAvatar from '../../assets/default_avatar.png';
import { useRegisterMutation } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/user/authSlice";
import { fetchError } from "../../utils/fetchError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/showToast";

const RegisterForm = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" })
    const [avatarPreview, setAvatarPreview] = useState(defaultAvatar)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [register, { isLoading, isError, error }] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            showToast.success('Registered Successfully!')
            navigate('/home')
        }
        if (isError) {
            fetchError(error as FetchBaseQueryError);
            return
        }

    }, [error, isAuthenticated, isError, isLoading, navigate]);


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === 'avatar' && files && files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    setAvatarPreview(fileReader.result as string);
                    setAvatar(files[0]);
                }
            };
            fileReader.readAsDataURL(files[0]);
        } else {
            setUserData(prev => ({ ...prev, [name]: value }));
        }
    }

    const registerForm = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            const res = await register(formData).unwrap();
            dispatch(setCredentials(res.user));
        } catch (err) {
            console.error(err);
            showToast.error('Registration failed')
        }
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 pt-10 font-serif">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <form onSubmit={registerForm} encType="multipart/form-data" className="space-y-6">
                    <h1 className="text-2xl font-semibold">Register</h1>

                    {/* Name */}
                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name_field"
                            value={userData.name}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                            onChange={onChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email_field"
                            value={userData.email}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                            onChange={onChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password_field"
                            value={userData.password}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                            onChange={onChange}
                            required
                        />
                    </div>

                    {/* Avatar Upload */}
                    <div>
                        <label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-700 mb-2">
                            Avatar
                        </label>
                        <div className="flex items-center space-x-4">
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-14 h-14 rounded-full object-cover border"
                            />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border px-4 py-2 rounded text-sm font-medium text-gray-700">
                                Choose Avatar
                                <input
                                    type="file"
                                    name="avatar"
                                    id="customFile"
                                    onChange={onChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"

                        className={`w-full py-3 rounded text-white font-semibold text-sm transition duration-200 ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-orange-400 hover:bg-teal-700'
                            }`}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    );
}
export default RegisterForm