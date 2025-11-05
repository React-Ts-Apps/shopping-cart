import { useParams } from "react-router-dom";
import { useRecipesStore } from "../store/RecipesStore";
import RecipeLoader from "./RecipeLoader";
import ErrorLoader from "./ErrorLoader";
import { useFilterQuery } from "../hooks/useFilterQuery";


const MealDetails = () => {
    const { mealHubItem, selectedDish } = useRecipesStore()
    const { id } = useParams()
    const shouldFetch = !selectedDish || (selectedDish.idMeal !== id)
    const filterType = mealHubItem !== 'random' ? 'byId' : mealHubItem
    const { data: fetchedData, isError, isLoading } = useFilterQuery(filterType, id, shouldFetch)

    if (isLoading) return <RecipeLoader message='Loading..' />
    if (isError) return <ErrorLoader message='Something went wrong..' />

    const meal = fetchedData?.[0]
    return (
        meal &&
        <div className="pl-70 pt-10 h-[80vh] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 pl-5 text-orange-800 ">{meal.strMeal}</h1>

            {/* Image and Ingredients side-by-side */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full md:w-1/2 max-w-sm rounded-lg object-cover"
                />

                <div className="md:w-1/2 pl-15 ">
                    <p><strong>Category:</strong> {meal.strCategory}</p>
                    <p><strong>Area:</strong> {meal.strArea}</p>

                    <h2 className="text-xl mt-4 mb-2 font-extrabold">Ingredients</h2>
                    <ol className="list-disc list-inside text-sky-700">
                        {[...Array(20)].map((_, i) => {
                            const ingredient = meal[`strIngredient${i + 1}`];
                            const measure = meal[`strMeasure${i + 1}`];
                            return ingredient && ingredient.trim() ? (
                                <li key={i}>{ingredient}{measure ? `: ${measure}` : ''}</li>
                            ) : null;
                        })}
                    </ol>
                </div>
            </div>

            <div className="pr-20 justify-center">
                <h3 className="text-2xl mt-6 mb-2 font-bold ">Instructions</h3>
                <p className="whitespace-pre-line">{meal.strInstructions}</p>
            </div>

            {meal.strYoutube && (
                <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-4 block"
                >
                    Watch Video Tutorial
                </a>
            )}

            {meal.strSource && (
                <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 block"
                >
                    Recipe Source
                </a>
            )}
        </div>

    );
}
export default MealDetails