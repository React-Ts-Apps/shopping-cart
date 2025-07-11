import { useState, type FormEvent } from "react";
import type { UserFormProps } from "../../types";
import defaultAvatar from '../../assets/default_avatar.png'

const UserForm = ({
    initialValues,
    onSubmit,
    buttonLabel,
    showPasswordField = false,
    isLoading = false
}: UserFormProps) => {
    const [userData, setUserData] = useState({
        name: initialValues.name,
        email: initialValues.email,
        password: ''
    })
    const [avatarPreview, setAvatarPreview] = useState(initialValues.avatar || defaultAvatar)
    const [avatar, setAvatar] = useState<File | null>(null)

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        onSubmit(formData)
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 pt-10 font-serif">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                    <h1 className="text-2xl font-semibold">{buttonLabel}</h1>

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
                    {showPasswordField && <div>
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
                    </div>}

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
                        {buttonLabel}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default UserForm