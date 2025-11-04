import { Route, Routes, useNavigate } from "react-router-dom"
import { useRecipesStore } from "../store/RecipesStore"
import MealListBase from "./MealListBase"
import MealDetails from "./MealDetails"
import IngredientList from "./IngredientList"
import RecipeSearch from "./RecipeSearch"
import { useEffect, useMemo } from "react"

const BASE_PATH = '/recipes'

const AppRoutes = () => {
    const RecipesRedirect = () => {
        const navigate = useNavigate();
        const { mealHubItem, selectedCategory, selectedArea } = useRecipesStore();

        const redirectPath = useMemo(() => {
            if (mealHubItem === "categories" && selectedCategory) {
                return `${BASE_PATH}/categories/${selectedCategory}/page/1`;
            } else if (mealHubItem === "areas" && selectedArea) {
                return `${BASE_PATH}/areas/${selectedArea}/page/1`
            } else if (mealHubItem === "random") {
                return `${BASE_PATH}/random`
            } else if (mealHubItem === "ingredients") {
                return `${BASE_PATH}/ingredients`
            } else if (mealHubItem === "search") {
                return `${BASE_PATH}/search`
            } else {
                return `${BASE_PATH}/search`
            }
        }, [mealHubItem, selectedArea, selectedCategory]);

        useEffect(() => {
            navigate(redirectPath, { replace: true })
        }, [redirectPath, navigate])

        return null;
    };

    return (
        <Routes>
            <Route path="/" element={<RecipesRedirect />} />

            <Route path="/categories/:category/page/:page" element={<MealListBase />} />
            <Route path="/areas/:area/page/:page" element={<MealListBase />} />
            <Route path="/random" element={<MealDetails />} />
            <Route path="/view/:id" element={<MealDetails />} />
            <Route path="/ingredients" element={<IngredientList />} />
            <Route path="/ingredients/:ingredient/page/:page" element={<MealListBase />} />
            <Route path="/search" element={<RecipeSearch />} />
            <Route path="/search/:searchText/page/:page" element={
                <>
                    <RecipeSearch />
                    <MealListBase />
                </>
            } />
        </Routes>
    );
};

export default AppRoutes;
