import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"

const LayOut = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}
export default LayOut