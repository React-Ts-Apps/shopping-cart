import Card from "./Card"
import LoadData from "../ui/LoadData"
import type { ItemProps } from "../../types"
import { useTitle } from "../../hooks/useTitle"
import { useGetProductsQuery } from "../../services/productsApi"

const ProductList = () => {
    const { data, error, isLoading } = useGetProductsQuery({})
    useTitle('Home')

    if (isLoading) return <LoadData message='Render responding...' />
    if (error) return <p className="p-10 font-semibold text-red-600">Error in loading..</p>

    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {data.products.map((product: ItemProps) =>
                    <Card key={product._id} data={product} />
                )}
            </div>

        </div>)
}
export default ProductList