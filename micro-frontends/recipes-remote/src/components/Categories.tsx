import { useNavigate } from "react-router-dom";
import { useRecipesStore } from "../store/RecipesStore";
import MealGroups from "./MealGroups";

const Categories = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, mealHubItem } = useRecipesStore()

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName)
    navigate(`/recipes/${mealHubItem}/${categoryName}/page/1`, { replace: true })
  }

  return (
    <MealGroups type="categories" onItemClick={(name) => handleCategoryChange(name)} />
  );
};
export default Categories;
