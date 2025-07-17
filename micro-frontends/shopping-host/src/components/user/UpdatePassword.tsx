import { useState, type FormEvent } from "react"
import { useUpdatePasswordMutation } from "../../services/authApi"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "../../redux/features/user/authSlice"
import type { ErrorPops } from "../../types"
import { showToast } from "../../utils/showToast"
import { useDispatch } from "react-redux"
import Button from "../ui/Button"

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [updatePassword, { isError }] = useUpdatePasswordMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await updatePassword({ password, oldPassword }).unwrap()
            dispatch(setCredentials(res.user))
            showToast.success('Password Updated')
            navigate('/profile', { replace: true })
        } catch (error: unknown) {
            const errorMsg = (error as ErrorPops)?.data?.message || "Failed to update password";
            showToast.error(errorMsg)
        }

    }

    return (
        <div className="flex justify-center items-start px-4 pt-10 min-h-screen font-serif bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg p-8 ">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <h1 className="text-2xl font-semibold mb-6">Update Password</h1>
                    <div>
                        <label htmlFor="password_1" className="block text-sm font-medium mb-1 text-grey-700">
                            Enter Old Password
                        </label>
                        <input id="password_1" type="password"
                            value={oldPassword}
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required />
                    </div>

                    <div>
                        <label htmlFor="password_2" className="block text-sm font-medium mb-1 text-grey-700">
                            New Password
                        </label>
                        <input id="password_2" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            required />
                    </div>
                    <Button id="update_password_button" text="Update Password" />
                </form>
            </div>
        </div>)

}
export default UpdatePassword