import { Menu } from 'lucide-react';
import MenuClose from "../ui/MenuClose"
import PriceSlider from "../ui/PriceSlider"
import { Categories } from "../product/Categories"

interface SideBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onCategoryChange: (category: string) => void;
    onPriceChange: (value: [number, number]) => void;
    price: [number, number];
    onApplyFilter: () => void;
    productCategory: string;
    isApplyDisabled: boolean;
}

const SideBar = ({
    isOpen,
    onToggle,
    onCategoryChange,
    onPriceChange,
    price,
    onApplyFilter,
    productCategory,
    isApplyDisabled
}: SideBarProps) => {
    return (
        <>
            {/* Sidebar container with dynamic width based on isOpen */}
            <aside className={`${isOpen ? 'w-64' : 'w-16'} shadow-lg p-6 mt-2`}>
                {/* Button to toggle sidebar open/close */}
                <button onClick={onToggle}>
                    {isOpen ? <MenuClose text="Product Categories" /> : <Menu className="text-teal-700" />}
                </button>

                {isOpen && (
                    <>
                        {/* Categories list, passes selected category to handler */}
                        <Categories onSelect={onCategoryChange} selectedCategory={productCategory} />

                        <hr className="text-gray-300 my-4" />

                        {/* Price filter section */}
                        <div>
                            <p className="font-bold text-md text-teal-700">Price</p>
                            <div className="my-4">
                                <PriceSlider
                                    sliderHandle={(value) => onPriceChange(value as [number, number])} // Pass slider changes to parent
                                    price={price}                                                      // Current price range state
                                />
                            </div>
                        </div>

                        <hr className="text-gray-300 my-9" />

                        {/* Apply Filter button, right-aligned */}
                        <div className="flex justify-end">
                            <button
                                className="bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded
                                 hover:bg-teal-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                onClick={onApplyFilter}
                                disabled={isApplyDisabled}
                            >
                                Apply Filter
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default SideBar;
