
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"

const AdminDashBoard = () => {

    return (
        <div className="flex">
            <div className="w-1/3"> <ProductForm /></div>
            <div className="w-2/3"> <ProductList /></div>
        </div>)
}
export default AdminDashBoard