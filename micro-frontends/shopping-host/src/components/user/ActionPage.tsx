import { useParams } from "react-router"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const ActionPage = () => {
    const { action } = useParams()
    if (action === 'login') {
        return <LoginForm />
    }
    else if (action === 'signup') {
        return <RegisterForm />
    }
    return <p className="p-10 font-semibold">Page Not Found</p>
}
export default ActionPage