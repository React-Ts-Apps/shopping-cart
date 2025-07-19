import { useState, type FormEvent } from "react"
import { useForgotPasswordMutation } from "../../services/authApi"
import { showToast } from "../../utils/showToast"
import type { ErrorPops } from "../../types"
import Button from "../ui/Button"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword, { isError }] = useForgotPasswordMutation()

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const res = await forgotPassword({ email }).unwrap()
            showToast.success(res.message)
        } catch (error: unknown) {
            const errorMsg = (error as ErrorPops)?.data?.message || "Failed to send email";
            showToast.error(errorMsg)
        }
    }

    return (
        <div className="flex justify-center font-serif items-start min-h-screen  bg-gray-100 px-4 pt-10">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
                <form onSubmit={submitHandler} className="space-y-6">
                    <h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>
                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            required
                        />
                    </div>
                    <Button id="forgot_password_button" text='Send Email' />
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword