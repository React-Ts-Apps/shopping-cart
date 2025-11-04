import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecipesStore } from "../store/RecipesStore"

const RecipeSearch = () => {
    const [input, setInput] = useState('')
    const { setSearchText } = useRecipesStore()
    const navigate = useNavigate()

    const handleOnClick = () => {
        setSearchText(input)
        navigate(`/recipes/search/${input}/page/1`, { replace: true })
    }

    return (
        <div className="p-10">
            <div className="pl-40 flex gap-2 mb-4">
                <input type="text" value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter recipe name or ingredient here...."
                    className="border p-1 w-80" />
                <button type="button" className="px-4 py-2 rounded text-sm md:text-base font-medium tracking-wide
                 text-white cursor-pointer transition-colors shadow-md hover:shadow-lg
                 bg-orange-600 hover:bg-black" onClick={() => handleOnClick()}>
                    Search
                </button>
            </div>
        </div>
    )

}
export default RecipeSearch