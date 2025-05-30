import { useQuery } from "@tanstack/react-query"
import type { MealHubGroups, MealHubGroupsKeys } from "../types"
import { useRecipesStore } from "../store/RecipesStore"
import { RecipeServices } from "../services/RecipeServices"

const listQueryFn = (type: MealHubGroupsKeys) => {
    switch (type) {
        case 'categories': return () => RecipeServices.getAllCategories();
        case 'areas': return () => RecipeServices.getAllAreas();
        case 'ingredients': return () => RecipeServices.getAllIngredients();
        default: throw new Error('Unknown list type')
    }
}

export const useListQuery = <T extends MealHubGroupsKeys>(type: T) => {
    const { mealHubItem } = useRecipesStore()
    return useQuery<MealHubGroups[T]>({
        queryKey: ["groups", type],
        queryFn: listQueryFn(type),
        enabled: mealHubItem === type,
    });
}