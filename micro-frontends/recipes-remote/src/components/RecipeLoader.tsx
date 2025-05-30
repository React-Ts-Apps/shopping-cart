import { Loader as LoaderIcon } from "lucide-react"
const RecipeLoader = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col items-center justify-center pt-30 font-semibold text-lg">
            <LoaderIcon className="animate-spin text-orange-600 mb-3" size={32} />
            <span>{message}</span>
        </div>
    )
}
export default RecipeLoader