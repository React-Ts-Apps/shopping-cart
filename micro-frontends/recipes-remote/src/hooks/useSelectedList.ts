import { useRecipesStore } from "../store/RecipesStore"

export const useSelectedList = () => {
    const { mealHubItem, selectedArea, selectedCategory, selectedIngredient, searchText } = useRecipesStore()

    const selectionMap = {
        categories: selectedCategory,
        areas: selectedArea,
        ingredients: selectedIngredient,
        search: searchText,
        random: ''
    }
    return selectionMap[mealHubItem]
}