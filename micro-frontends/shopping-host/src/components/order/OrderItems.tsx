import { Link } from "react-router-dom"
import type { OrderItemProps } from "../../types"

const OrderItems = ({ data }: { data: OrderItemProps[] }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2 text-shadow-2xs font-mono">Ordered Items</h2>
            {
                data && data.map((item) => (

                    <div
                        key={item.product}
                        className="flex items-center px-2 py-3 border-b border-gray-200 gap-x-2">
                        <div className="w-16 flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-12 object-cover rounded" />
                        </div>

                        <div className="flex-1 px-2 max-w-xs">
                            <Link
                                to={`/product/${item.product}`}
                                className="text-teal-600 font-serif hover:underline font-medium truncate">
                                {item.name}
                            </Link>
                        </div>

                        <div className="text-right text-gray-800 text-md font-serif min-w-[120px]">
                            {item.quantity} x kr {item.price} = <b>kr {item.quantity * item.price}</b>
                        </div>
                    </div>
                ))}
        </div>

    )
}
export default OrderItems