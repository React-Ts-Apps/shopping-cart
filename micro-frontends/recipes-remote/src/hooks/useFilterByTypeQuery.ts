import { useQuery } from "@tanstack/react-query";
import { RecipeServices } from "../services/RecipeServices";
import type { MealHubProps, MealProps } from "../types";

const getQueryFn = (type: MealHubProps, value: string) => {
    switch (type) {
        case 'categories': return () => RecipeServices.getByCategory(value);
        case 'areas': return () => RecipeServices.getByArea(value);
        case 'ingredients': return () => RecipeServices.getByIngredient(value);
        case 'search': return () => RecipeServices.searchByNameAndIngredient(value);
        default: throw new Error('Invalid type');
    }
};

export const useFilterByTypeQuery = (filterType: MealHubProps, value: string) => {
    return useQuery<MealProps[]>({
        queryKey: ["menu", filterType, value],
        queryFn: getQueryFn(filterType, value),
        enabled: !!value,
    })
}