import { useEffect, useState, type FormEvent } from "react"
import { useResetPasswordMutation } from "../../services/authApi"
import { useNavigate, useParams } from "react-router-dom"
import { setCredentials } from "../../redux/features/user/authSlice"
import type { ErrorPops } from "../../types"
import { showToast } from "../../utils/showToast"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetPassword, { isError }] = useResetPasswordMutation()
    const { token } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            showToast.success('Password Reset')
            navigate('/home', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await resetPassword({ password, confirmPassword, token }).unwrap()
            dispatch(setCredentials(res.user))

        } catch (error: unknown) {
            const errorMsg = (error as ErrorPops)?.data?.message || "Failed to reset password";
            showToast.error(errorMsg)
        }

    }

    return (
        <div className="flex justify-center items-start px-4 pt-10 min-h-screen font-serif bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg p-8 ">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
                    <div>
                        <label htmlFor="password_1" className="block text-sm font-medium mb-1 text-grey-700">
                            Enter Password
                        </label>
                        <input id="password_1" type="password"
                            value={password}
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    <div>
                        <label htmlFor="password_2" className="block text-sm font-medium mb-1 text-grey-700">
                            Confirm Password
                        </label>
                        <input id="password_2" type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            required />
                    </div>
                    <button id="forgot_password_button" type="submit"
                        className=" bg-orange-400 hover:bg-teal-900 w-full py-3 rounded text-white font-semibold">Reset Password</button>
                </form>

            </div>
        </div>)

}
export default ResetPassword