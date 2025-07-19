import { useMemo } from "react";
import { useFilterByTypeQuery } from "../hooks/useFilterByTypeQuery";
import { useRecipesStore } from "../store/RecipesStore";
import Pagination from "./Pagination";
import PopUp from "./PopUp";
import { ITEMS_PER_PAGE as itemsPerPage } from "../constants";
import { Link } from "react-router-dom";
import { useSelectedList } from "../hooks/useSelectedList";
import RecipeLoader from "./RecipeLoader";
import ErrorLoader from "./ErrorLoader";


const MealListBase = () => {
    const { mealHubItem, currentPage, showPopUp, handleShowPopUp, setSelectedDishId } = useRecipesStore()
    const selectedValue = useSelectedList()
    const { data: menu = [], isLoading, isError } = useFilterByTypeQuery(mealHubItem, selectedValue)
    const menuList = useMemo(() => {
        const firstIndex = currentPage * itemsPerPage - itemsPerPage;
        const lastIndex = Math.min(currentPage * itemsPerPage, menu.length);
        return menu.slice(firstIndex, lastIndex);
    }, [currentPage, menu]);


    if (isLoading) return <RecipeLoader message='Loading..' />
    if (isError) return <ErrorLoader message='Something went wrong..' />


    return (
        <div>
            {showPopUp && <PopUp />}
            <>
                <div className="flex h-[50vh]">
                    <section className="pl-50  overflow-y-auto">
                        <ul className="p-4 flex flex-wrap justify-start gap-3" role="list">
                            {menuList.length ? (
                                menuList.map(
                                    (dish) =>
                                        dish && (
                                            <li className="group w-[20%]" key={dish.idMeal} role="listitem">
                                                <div className="relative w-full">
                                                    <img src={dish.strMealThumb} alt={dish.strMeal} className="w-full h-auto block" />
                                                    <div
                                                        className="absolute cursor-pointer pl-8 bottom-4 left-0 right-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-b-lg py-2"
                                                        onClick={() => handleShowPopUp(dish.idMeal)}
                                                    >
                                                        Click to view
                                                    </div>
                                                </div>

                                                <Link to={`/recipes/view/${dish.idMeal}`} onClick={() => setSelectedDishId(dish.idMeal)}>
                                                    <h4 className="mt-2 text-sm font-semibold truncate hover:text-orange-600 transition">
                                                        {dish.strMeal}
                                                    </h4>
                                                </Link>
                                            </li>
                                        )
                                )
                            ) : (
                                <p>No items available</p>
                            )}
                        </ul>
                    </section>
                </div>
            </>
            <Pagination menuLength={menu.length} />
        </div>
    );
};
export default MealListBase