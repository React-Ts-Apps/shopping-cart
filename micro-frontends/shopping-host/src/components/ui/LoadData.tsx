import { Loader } from "lucide-react"

const LoadData = ({ message }: { message: string }) => {
    return (<div className="flex items-center justify-center min-h-svh min-w-svw">
        <div className="flex flex-col items-center">
            <Loader className="animate-spin w-8 h-8 text-blue-900" />
            <span className="text-blue-800  font-stretch-100% font-semibold">{message}</span>
        </div>
    </div>)
}
export default LoadData