import { useNavigate } from "react-router-dom";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useRecipesStore } from "../store/RecipesStore";
import type { PopUpProps } from "../types";
import RecipeLoader from "./RecipeLoader";
import ErrorLoader from "./ErrorLoader";

const PopUp = ({ dataToPopUp }: { dataToPopUp?: PopUpProps }) => {
  const { selectedDishId, setSelectedDish, setSelectedIngredient, closePopUp } = useRecipesStore();

  const { data: selectedDish, isLoading, isError } = useFilterQuery(
    "byId",
    selectedDishId,
    !dataToPopUp
  );
  const navigate = useNavigate()
  const dish = selectedDish?.[0];

  const popUpData = dataToPopUp || dish &&
  {
    id: dish.idMeal,
    description: dish.strInstructions,
    imgSrc: dish.strMealThumb,
    name: dish.strMeal,
    type: dish.strCategory
  }

  if (isLoading) return <RecipeLoader message='Loading..' />
  if (!popUpData || isError) return <ErrorLoader message='Something went wrong..' />


  const handleShowFullRecipe = () => {
    setSelectedDish(selectedDish?.[0])
    closePopUp()
    navigate(`/recipes/view/${selectedDishId}`, { replace: true })
  }

  const handleShowList = (ingredient: string) => {
    setSelectedIngredient(ingredient)
    closePopUp()
    navigate(`/recipes/ingredients/${ingredient}/page/1`, { replace: true })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg w-[90vw] max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <img
          src={popUpData?.imgSrc}
          alt={popUpData?.name}
          className="w-[300px] h-[300px] object-cover rounded-t-lg p-2 mx-auto"
        />

        <h2 className="text-lg font-semibold text-center my-2 px-4">
          <p><strong>Name:</strong> {popUpData.name}</p>
          {popUpData.type && <p><strong>Category:</strong> {popUpData.type}</p>}
        </h2>

        <div className="overflow-y-auto px-6 py-4 text-sm leading-relaxed text-center max-h-[calc(90vh-380px)]">
          {popUpData?.description || 'No description available'}
        </div>

        <div className="flex justify-end gap-1 px-6 py-3">
          <button
            onClick={() => closePopUp()}
            className="bg-gray-600 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
          >
            Close
          </button>
          {dataToPopUp ? <button
            onClick={() => handleShowList(popUpData.name)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
          >
            View Recipes
          </button> : <button
            onClick={() => handleShowFullRecipe()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
          >
            View Full Recipe
          </button>}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
