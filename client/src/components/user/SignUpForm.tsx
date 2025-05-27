import { useState, type ChangeEvent, type FormEvent } from "react"
import instance from "../../api/axios"
import type { UserProps } from "../../types"
import type { AxiosError } from "axios"
import { Link } from "react-router-dom"

const SignUpForm = () => {
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState<UserProps>({ name: '', email: '', password: '' })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const validateForm = () => {
        const { name, email, password } = form
        if (!name || !email || !password) return 'All fields are required'
        if (password.length < 4) return 'Password must be at least 4 characters'
        return null
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const { name, email, password } = form

            // Form validation
            const validationError = validateForm()
            if (validationError) {
                setError(validationError)
                setMessage(null)
                return
            }
            const response = await instance.post('/auth/signup', { name, email, password })
            const { data } = response
            setMessage(data.message)
            setError(null)
        } catch (er) {
            const axiosError = er as AxiosError<{ message: string }>
            if (axiosError.response?.data?.message) {
                setError(axiosError.response.data.message)
            } else {
                setError('Something went wrong')
            }
            setMessage(null)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] max-w-xl mx-auto p-10 text-gray-800 space-y-3">
            <h2 className="font-semibold text-center text-xl">Register User</h2>

            <div className="flex flex-col space-y-3">
                <label htmlFor="name" className="font-semibold">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="border border-blue-900 rounded p-1"
                />
            </div>

            <div className="flex flex-col space-y-3">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="name"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-blue-900 rounded p-1"
                />
            </div>

            <div className="flex flex-col space-y-3">
                <label htmlFor="password" className="font-semibold">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    className="border border-blue-900 rounded p-1"
                />
            </div>
            <div className="flex flex-row gap-4 justify-end">
                <Link to="/login" className="pt-4 text-blue-700 font-semibold hover:underline">Login existing user</Link>
                <button
                    type="submit"
                    className="w-24 mt-2 px-3 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded"
                >
                    Submit
                </button>
            </div>

            <div className="h-6 text-center">
                {message && <p className="text-green-700 font-medium">{message}</p>}
                {error && <p className="text-red-700 font-medium">{error}</p>}
            </div>


        </form>

    )
}
export default SignUpForm