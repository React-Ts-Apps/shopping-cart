import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { ToastContainer } from 'react-toastify'

const LayOut = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <ToastContainer position="bottom-center" theme="colored" pauseOnHover />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}
export default LayOut