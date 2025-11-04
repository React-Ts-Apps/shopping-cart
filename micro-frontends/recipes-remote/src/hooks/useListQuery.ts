import { useQuery } from "@tanstack/react-query"
import type { MealHubGroups, MealHubGroupsKeys } from "../types"
import { useRecipesStore } from "../store/RecipesStore"
import { RecipeServices } from "../services/RecipeServices"

const queryMap = {
    categories: RecipeServices.getAllCategories,
    areas: RecipeServices.getAllAreas,
    ingredients: RecipeServices.getAllIngredients
}

const listQueryFn = <T extends MealHubGroupsKeys>(type: T) => queryMap[type]

export const useListQuery = <T extends MealHubGroupsKeys>(type: T) => {
    const { mealHubItem } = useRecipesStore()
    return useQuery<MealHubGroups[T]>({
        queryKey: ["groups", type],
        queryFn: listQueryFn(type),
        staleTime: 1000 * 60 * 5, //no refetch in 5 minutes
        enabled: mealHubItem === type,
    });
}