import { useQuery } from "@tanstack/react-query"
import { RecipeServices } from "../services/RecipeServices"
import type { MealProps } from "../types"
import { useRecipesStore } from "../store/RecipesStore"

export const useMealById = (id: string) => {
    return useQuery<MealProps[]>({
        queryKey: ["selectedDish", id],
        queryFn: () => RecipeServices.getMealById(id),
        enabled: !!id
    })
}

export const useRandomMeal = () => {
    const { mealHubItem } = useRecipesStore()
    return useQuery<MealProps[]>({
        queryKey: ["random"],
        queryFn: () => RecipeServices.getRandomMeal(),
        enabled: mealHubItem === 'random'
    })
}