import { useQuery } from "@tanstack/react-query";
import { RecipeServices } from "../services/RecipeServices";
import type { MealHubProps, MealProps } from "../types";

type ExtendedFilterTypes = 'byId' | MealHubProps

export const useFilterByTypeQuery = (filterType: ExtendedFilterTypes, value: string | undefined) => {
    const queryMap = {
        categories: () => RecipeServices.getByCategory(value ?? ""),
        areas: () => RecipeServices.getByArea(value ?? ""),
        ingredients: () => RecipeServices.getByIngredient(value ?? ""),
        search: () => RecipeServices.searchByNameAndIngredient(value ?? ""),
        random: () => RecipeServices.getRandomMeal(),
        byId: () => RecipeServices.getMealById(value ?? "")
    }

    return useQuery<MealProps[]>({
        queryKey: ["menu", filterType, value],
        queryFn: queryMap[filterType],
        enabled: filterType === 'random' || !!value,
    })
}