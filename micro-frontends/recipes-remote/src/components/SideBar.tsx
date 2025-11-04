import { X, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useRecipesStore } from "../store/RecipesStore"
import { MEAL_HUB_ITEMS as mealHubItems } from "../constants"
import { useNavigate } from "react-router-dom"
import { useRandomMeal } from "../hooks/useFilterQuery"
import type { MealHubProps } from "../types"
import RecipeLoader from "./RecipeLoader"
import ErrorLoader from "./ErrorLoader"

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true)
    const { mealHubItem, setMealHubItem, setSelectedDish, setCurrentPage } = useRecipesStore()
    const navigate = useNavigate()

    //trigger only if random selected
    const { data: randomData, isLoading, isError } = useRandomMeal()

    useEffect(() => {
        if (mealHubItem === 'random' && randomData?.[0]) {
            setSelectedDish(randomData[0])
        }
    }, [mealHubItem, navigate, randomData, setSelectedDish])


    if (isLoading) return <RecipeLoader message='Loading..' />
    if (isError) return <ErrorLoader message='Something went wrong..' />

    const handleHubChange = (item: MealHubProps) => {
        if (mealHubItem !== item) {
            setMealHubItem(item)
            setCurrentPage(1)
            navigate('/recipes')
        }
    }
    return (
        <>
            <button className="fixed left-4 top-40 z-50 text-gray-800" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div className={`fixed top-50 left-0 p-5 h-full ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <h1 className=" text-xl font-semibold mb-8"> Recipe Hub</h1>
                <nav className="flex flex-col gap-4 text-gray-700 font-medium cursor-pointer">
                    {
                        mealHubItems.map(({ label, value }) => (
                            <div key={value} onClick={() => handleHubChange(value)} className={`hover:text-green-500 
                                ${value === mealHubItem ? "text-red-700" :
                                    "text-green-900"}`}>{label}</div>
                        ))
                    }
                </nav>
            </div>
        </>
    )
}
export default SideBar