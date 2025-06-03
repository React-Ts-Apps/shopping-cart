import { Link, useNavigate } from "react-router-dom"
import type { LoginProps } from "../../types"
import { useState, type ChangeEvent, type FormEvent } from "react"
import instance from "../../api/axios"
import type { AxiosError } from "axios"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../redux/features/user/authSlice"

const LoginForm = () => {
    const [form, setForm] = useState<LoginProps>({ email: '', password: '' })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateForm = () => {
        const { email, password } = form
        if (!email || !password) return 'All fields are required'
        return null
    }

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault()
        try {
            const errorMessage = validateForm()
            if (errorMessage) {
                setError(errorMessage)
                return
            }
            const response = await instance.post('/auth/login', form)

            if (response.data) {
                console.log(response.data)
                const { _id, name, email } = response.data
                const user = { _id, name, email }
                sessionStorage.setItem('user', JSON.stringify(user))
                dispatch(loginSuccess({ user }))
                setError(null)
                navigate('/', { replace: true })
            }
        } catch (er) {
            const axiosError = er as AxiosError<{ message: string }>
            if (axiosError.response?.data?.message) {
                setError(axiosError.response.data.message)
            } else {
                setError('Something went wrong')
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] max-w-xl mx-auto  p-10 text-gray-800">
            <h2 className="font-semibold text-center ">Login</h2>
            <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input type='text' id='email' name="email" onChange={(e) => handleChange(e)}
                        width={20} value={form.email} className="border rounded border-blue-900 p-1" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input type='password' id='password' name="password"
                        value={form.password} onChange={(e) => handleChange(e)}
                        className="border border-blue-900 rounded p-1" />
                </div>
                <div className="flex flex-row gap-4 justify-between">
                    <Link to="/signup" className="pt-6 text-blue-700 hover:underline">Register New User?</Link>
                    <button type="submit" className="border rounded mt-4 px-2 py-2 bg-blue-600 hover:bg-blue-900 text-white">Login</button>
                </div>
                <div className="h-6 text-center">
                    {error && <p className="text-red-700 font-medium">{error}</p>}
                </div>
            </div>
        </form >
    )
}
export default LoginForm