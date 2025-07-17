import { Menu } from 'lucide-react';
import MenuClose from "../ui/MenuClose"
import PriceSlider from "../ui/PriceSlider"
import { Categories } from "../product/Categories"
import ReviewStars from './ReviewStars';
import type { SideBarProps } from '../../types';

const SideBar = ({
    isOpen,
    onToggle,
    onCategoryChange,
    productCategory,
    filters,
    onFilterChange
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
                        {/* Categories Filter */}
                        <Categories onSelect={onCategoryChange} selectedCategory={productCategory} />

                        <hr className="text-gray-300 my-4" />

                        {/* Price filter section */}
                        <div>
                            <p className="font-bold text-md text-teal-700">Price</p>
                            <div className="my-4">
                                <PriceSlider
                                    sliderHandle={(value) => onFilterChange('price', value as [number, number])} // Pass slider changes to parent
                                    price={filters.price}                                                      // Current price range state
                                />
                            </div>
                        </div>

                        <hr className="text-gray-300 my-9" />

                        {/* Reviews Filter */}

                        <div>
                            <p className="font-bold text-md text-teal-700">Reviews</p>
                            <div className="my-4">
                                {[5, 4, 3, 2, 1].map((rating => {
                                    const isSelected = rating === filters.ratings
                                    return (<div key={`rating-${rating}`}
                                        className={`cursor-pointer p-1 ${isSelected ? 'bg-orange-100 border border-orange-500' : 'hover:bg-gray-500'}`}
                                        onClick={() => onFilterChange('ratings', rating)}>
                                        <ReviewStars ratings={rating} />
                                    </div>)
                                }))}
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default SideBar;
