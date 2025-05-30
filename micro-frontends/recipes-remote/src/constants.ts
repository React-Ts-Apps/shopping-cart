import type { MealHubProps } from "./types";

export const ITEMS_PER_PAGE = 8;

export const MEAL_HUB_ITEMS: { label: string, value: MealHubProps }[] = [
    { label: 'Categories', value: 'categories' },
    { label: 'World Flavours', value: 'areas' },
    { label: 'Ingredients', value: 'ingredients' },
    { label: 'Random Meal', value: 'random' },
    { label: 'Search Favourites', value: 'search' }
];