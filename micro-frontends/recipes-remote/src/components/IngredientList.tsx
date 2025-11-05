import { useState } from "react";
import { SMALL_IMG_URL } from "../api/urls";
import { useListQuery } from "../hooks/useListQuery"
import { useRecipesStore } from "../store/RecipesStore";
import type { IngredientProps, PopUpProps } from "../types"
import PopUp from "./PopUp";
import RecipeLoader from "./RecipeLoader";
import ErrorLoader from "./ErrorLoader";

const IngredientList = () => {
    const { data: groups, isLoading, isError } = useListQuery('ingredients')
    const { showPopUp, handleShowPopUp } = useRecipesStore()
    const [ingredientToPopUp, setIngredientToPopUp] = useState<PopUpProps>()

    const handleShowIngredient = (item: IngredientProps) => {
        setIngredientToPopUp({
            id: item.idIngredient,
            description: item.strDescription,
            name: item.strIngredient,
            type: item.strType,
            imgSrc: `${SMALL_IMG_URL}/${item.strIngredient}.png`
        });
        handleShowPopUp()
    }
    if (isLoading) return <RecipeLoader message='Loading..' />
    if (isError) return <ErrorLoader message='Something went wrong..' />

    return (
        <div>
            {showPopUp && <PopUp dataToPopUp={ingredientToPopUp} />}
            <div className="p-20 text-center">
                <div className=" h-[70vh] overflow-y-auto ">
                    <ul className="pl-20 flex flex-wrap justify-center gap-4  " role="list">
                        {groups?.length ? (
                            groups.map(
                                (item) =>
                                    item && (
                                        <li className="group w-[20%] border flex items-center justify-center p-4" key={item.idIngredient} role="listitem">
                                            <div className="relative w-full flex flex-col items-center">
                                                <img
                                                    src={`${SMALL_IMG_URL}/${item.strIngredient}.png`}
                                                    alt={item.strIngredient}
                                                    className="w-24 h-24 object-contain"
                                                />
                                                <div className="absolute cursor-pointer pl-8 bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-b-lg py-2 text-center"
                                                    onClick={() => handleShowIngredient(item)}>
                                                    Click to view
                                                </div>
                                                <h4 className="mt-2 text-sm font-semibold truncate hover:text-orange-600 transition">
                                                    {item.strIngredient}
                                                </h4>
                                            </div>
                                        </li>
                                    )
                            )
                        ) : (
                            <p>No items available</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default IngredientList;