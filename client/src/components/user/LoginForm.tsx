import { Link } from "react-router-dom"

const LoginForm = () => {

    return (
        <form className="w-[400px] max-w-xl mx-auto  p-10 text-gray-800">
            <h2 className="font-semibold text-center ">Login</h2>
            <div className="space-y-6 font-semibold">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="">Email</label>
                    <input type='text' id='email' width={20} className="border rounded border-blue-900 p-1" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="">Password</label>
                    <input type='password' id='password' className="border border-blue-900 rounded p-1" />
                </div>
                <div className="flex flex-row gap-4 justify-end">
                    <Link to="/signup" className="pt-6 text-blue-700 hover:underline">Register New User?</Link>
                    <button className="border rounded mt-4 px-2 py-2 bg-blue-600 hover:bg-blue-900 text-white">Submit</button>
                </div>
            </div>
        </form >
    )
}
export default LoginForm