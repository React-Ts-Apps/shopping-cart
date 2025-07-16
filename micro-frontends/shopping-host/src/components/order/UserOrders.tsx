import { Link } from "react-router-dom"
import { useTitle } from "../../hooks/useTitle"
import { useMyOrdersQuery } from "../../services/orderApi"
import { Eye } from "lucide-react"

const UserOrders = () => {
    const { data } = useMyOrdersQuery()
    useTitle('Orders')
    return (<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.orders.map(order => (
                        <tr key={order._id}>
                            <td className="px-6 py-4 text-sm text-gray-700">{order._id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.orderItems.length}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">kr {order.totalPrice}</td>
                            <td className="px-6 py-4 text-sm">
                                <span className={`font-semibold ${order.orderStatus.includes('Delivered') ? 'text-green-600' : 'text-red-500'}`}>
                                    {order.orderStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <Link to={`/order/${order._id}`} className="text-blue-600 hover:text-blue-800">
                                    <Eye className="w-5 h-5" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>)
}
export default UserOrders