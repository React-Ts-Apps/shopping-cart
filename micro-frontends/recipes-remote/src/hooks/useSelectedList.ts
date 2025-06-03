import { useRecipesStore } from "../store/RecipesStore"

export const useSelectedList = () => {
    const { mealHubItem, selectedArea, selectedCategory, selectedIngredient, searchText } = useRecipesStore()

    switch (mealHubItem) {
        case 'categories': return selectedCategory;
        case 'areas': return selectedArea;
        case 'ingredients': return selectedIngredient;
        case 'search': return searchText;
        default: return '';
    }
}