import { Link } from "react-router-dom"
import type { LoginProps } from "../../types"
import { useState, type ChangeEvent, type FormEvent } from "react"
import instance from "../../api/axios"

const LoginForm = () => {
    const [form, setForm] = useState<LoginProps>({ email: '', password: '' })
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const validateForm = () => {
        const { email, password } = form
        if (!email || !password) return 'All fields required'
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
            const { data } = response
            setMessage(data.message)
            setError(null)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] max-w-xl mx-auto  p-10 text-gray-800">
            <h2 className="font-semibold text-center ">Login</h2>
            <div className="space-y-6 font-semibold">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="">Email</label>
                    <input type='text' id='email' name="email" onChange={(e) => handleChange(e)}
                        width={20} value={form.email} className="border rounded border-blue-900 p-1" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="">Password</label>
                    <input type='password' id='password' name="password"
                        value={form.password} onChange={(e) => handleChange(e)}
                        className="border border-blue-900 rounded p-1" />
                </div>
                <div className="flex flex-row gap-4 justify-end">
                    <Link to="/signup" className="pt-6 text-blue-700 hover:underline">Register New User?</Link>
                    <button type="submit" className="border rounded mt-4 px-2 py-2 bg-blue-600 hover:bg-blue-900 text-white">Login</button>
                </div>
                <div className="h-6 text-center">
                    {message && <p className="text-green-700 font-medium">{message}</p>}
                    {error && <p className="text-red-700 font-medium">{error}</p>}
                </div>
            </div>
        </form >
    )
}
export default LoginForm