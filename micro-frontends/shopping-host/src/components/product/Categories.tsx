import { CATEGORIES, DEFAULT_CATEGORY } from "../../constants";

type Props = {
    onSelect: (category: string) => void;
    selectedCategory: string;
};

export const Categories = ({ onSelect, selectedCategory }: Props) => {

    return (
        <ul className="space-y-2 pl-5 text-sm font-semibold mt-4">
            {CATEGORIES.map((category, index) => {
                // Consider empty string as "All Products"
                const isSelected =
                    (category === DEFAULT_CATEGORY && selectedCategory === '') ||
                    category === selectedCategory;

                return (
                    <li
                        key={`${index}-${category}`}
                        className={`cursor-pointer ${isSelected ? 'text-orange-700 font-bold' : 'text-gray-600 hover:text-teal-600'
                            }`}
                        onClick={() => onSelect(category === DEFAULT_CATEGORY ? '' : category)}
                    >
                        {category}
                    </li>
                );
            })}
        </ul>
    );
};
