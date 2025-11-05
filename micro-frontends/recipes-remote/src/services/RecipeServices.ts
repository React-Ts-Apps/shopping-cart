import instance from "../api/axios";
import type { MealProps } from "../types";

export class RecipeServices {
    static async getAllCategories() {
        const res = await instance.get("list.php?c=list")
        return res.data.meals
    }

    static async getAllAreas() {
        const res = await instance.get("list.php?a=list")
        return res.data.meals
    }

    static async getAllIngredients() {
        const res = await instance.get("list.php?i=list")
        return res.data.meals
    }

    static async getByCategory(category: string) {
        const res = await instance.get(`/filter.php?c=${category}`)
        return res.data.meals
    }

    static async getByArea(area: string) {
        const res = await instance.get(`/filter.php?a=${area}`)
        return res.data.meals
    }

    static async getByIngredient(ing: string) {
        const res = await instance.get(`/filter.php?i=${ing}`)
        return res.data.meals
    }

    static async getMealById(id: string) {
        const res = await instance.get(`/lookup.php?i=${id}`)
        return res.data.meals
    }

    static async getRandomMeal() {
        const res = await instance.get('/random.php')
        return res.data.meals
    }

    static async searchByName(name: string) {
        const res = await instance.get(`/search.php?s=${name}`)
        return res.data.meals
    }
    static async searchByIngredient(name: string) {
        const res = await instance.get(`/filter.php?i=${name}`)
        return res.data.meals
    }
    static async searchByNameAndIngredient(query: string) {
        const [byNameRes, byIngredientRes] = await Promise.all([this.searchByName(query), this.searchByIngredient(query)
        ])
        const byNameList = byNameRes || [];
        const byIngredientList = byIngredientRes || [];

        const combinedMap = new Map<string, MealProps>();

        byNameList.forEach((meal: MealProps | undefined) => {
            if (meal?.idMeal) {
                combinedMap.set(meal.idMeal, meal);
            }
        });

        byIngredientList.forEach((meal: MealProps | undefined) => {
            if (meal?.idMeal) {
                combinedMap.set(meal.idMeal, meal);
            }
        });
        const mergedMeals = Array.from(combinedMap.values());

        return mergedMeals;
    }

}