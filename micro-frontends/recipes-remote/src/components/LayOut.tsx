import { useRecipesStore } from "../store/RecipesStore";
import AppRoutes from "./AppRoutes";
import Areas from "./Areas";
import Categories from "./Categories";
import SideBar from "./SideBar";

const LayOut = () => {
    const { mealHubItem } = useRecipesStore();

    return (
        <div>
            <SideBar />
            {mealHubItem === "categories" && <Categories />}
            {mealHubItem === "areas" && <Areas />}
            <AppRoutes />
        </div>
    )
}

export default LayOut