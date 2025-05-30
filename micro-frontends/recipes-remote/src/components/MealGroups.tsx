import { useListQuery } from "../hooks/useListQuery"
import type { AreaProps, CategoryProps, IngredientProps, MealHubListProps } from "../types"
import { useSelectedList } from "../hooks/useSelectedList"
import RecipeLoader from "./RecipeLoader"
import ErrorLoader from "./ErrorLoader"

const MealGroups = ({ type, onItemClick }: MealHubListProps) => {
    const selectedList = useSelectedList()
    const { data: groups = [], isError, isLoading } = useListQuery(type)

    if (isLoading) return <RecipeLoader message='Loading..' />
    if (isError) return <ErrorLoader message='Something went wrong..' />


    const extractName = (item: CategoryProps | AreaProps | IngredientProps) => {
        if (type === 'categories') return (item as CategoryProps).strCategory;
        if (type === 'areas') return (item as AreaProps).strArea;
        return ''
    }

    return (
        <section>
            <div className="pl-40 pr-30">
                <ul className="p-4 flex flex-wrap gap-3 justify-center w-full" role="list">
                    {groups.map((item, index) => {
                        const name = extractName(item);
                        return (
                            < li
                                key={index}
                                onClick={() => onItemClick(name)}
                                className={`px-4 py-2 rounded text-sm md:text-base font-medium tracking-wide text-white cursor-pointer transition-colors shadow-md hover:shadow-lg
                                ${selectedList === name ? "bg-black" : "bg-orange-600 hover:bg-black"}`}
                            >
                                {name}
                            </li>
                        )
                    })}
                </ul>

            </div>
        </section >
    )

}
export default MealGroups