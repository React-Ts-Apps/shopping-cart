import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const LayOut = () => {
    //LL
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}
export default LayOut