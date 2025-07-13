import Card from "./Card"
import LoadData from "../ui/LoadData"
import type { FilterProps, ItemProps } from "../../types"
import { useTitle } from "../../hooks/useTitle"
import { useGetProductsQuery } from "../../services/productsApi"
import { useCallback, useEffect, useState } from "react"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchError } from "../../utils/fetchError"
import Paginate from "../ui/Paginate"
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams"
import SideBar from "../ui/SideBar"
import { useQueryParams } from "../../hooks/useQueryParams"
import { DEFAULT_CATEGORY, DEFAULT_PRICE_RANGE } from "../../constants"
import LoadFail from "../ui/LoadFail"

const ITEMS_PER_PAGE = 4

const ProductList = () => {
    // Set document title to 'Home' on component mount
    useTitle('Home');

    // Custom hooks for parsing search params
    const { keyword, page, category } = useQueryParams();
    const categoryParam = category === DEFAULT_CATEGORY || !category ? '' : category

    const updateSearchParams = useUpdateSearchParams();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const [filters, setFilters] = useState<FilterProps>({ price: DEFAULT_PRICE_RANGE, ratings: null })
    const [appliedFilters, setAppliedFilters] = useState<FilterProps>({ price: DEFAULT_PRICE_RANGE, ratings: null })

    // Fetch products data from API using RTK Query with current filter params
    const { data, error, isLoading } = useGetProductsQuery({
        keyword,
        page,
        limit: ITEMS_PER_PAGE,     // TODO: Move to filter condition
        category: categoryParam,
        ...appliedFilters
    });

    // If there is an error from API call, show error notification
    useEffect(() => {
        if (error) fetchError(error as FetchBaseQueryError);
    }, [error]);

    useEffect(() => {
        setFilters({ price: DEFAULT_PRICE_RANGE, ratings: null })
        setAppliedFilters({ price: DEFAULT_PRICE_RANGE, ratings: null })
    }, [category])

    // Calculate total number of pages for pagination (safe with optional chaining)
    const pageCount = Math.ceil(data?.total / data?.limit) || 0;

    const isApplyDisabled = JSON.stringify(filters) !== JSON.stringify(appliedFilters)


    // Updates page query param to selected page + 1 (since react-paginate is 0-based)
    const handlePageChange = useCallback((selected: number) => {
        updateSearchParams({ page: String(selected + 1) });
    }, [updateSearchParams]);

    // Handler to apply price filter: updates activePriceRange and resets page to 1
    const applyFilter = useCallback(() => {
        setAppliedFilters(filters)
        updateSearchParams({ page: '1' });
    }, [filters, updateSearchParams]);


    // Resets price range to default and updates category and page params in URL
    const handleCategoryChange = useCallback((category: string) => {
        updateSearchParams({ category: category === DEFAULT_CATEGORY || !category ? '' : category, page: '1' }, true);
    }, [updateSearchParams]);

    // Render loading or error states early
    if (error) return <LoadFail />
    if (isLoading) return <LoadData message="Render responding..." />;

    return (
        <div className="flex min-h-screen">
            {/* Sidebar component with all controls */}
            <SideBar
                isOpen={isSideBarOpen}
                onToggle={() => setIsSideBarOpen(prev => !prev)}
                onCategoryChange={handleCategoryChange}
                filters={filters}
                onApplyFilter={applyFilter}
                productCategory={categoryParam}
                isApplyDisabled={!isApplyDisabled}
                onFilterChange={(name, value) =>
                    setFilters((prev) => ({ ...prev, [name]: value }))
                }
            />
            <main>
                <section className="lg:col-span-5">
                    {/* Show message if no products found */}
                    {data.products.length === 0 ? (
                        <div className="text-center font-semibold p-10 text-gray-500 mt-10">
                            No products found.
                        </div>
                    ) : (
                        // Show grid of product cards
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {data.products.map((product: ItemProps) => (
                                <Card key={product._id} data={product} />
                            ))}
                        </div>
                    )}

                    {/* Show pagination if multiple pages */}
                    {pageCount > 1 && (
                        <div className="flex mt-4 justify-center">
                            <Paginate
                                pageCount={pageCount}
                                currentPage={page - 1}          // react-paginate 0-based current page
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};


export default ProductList
