import { useParams } from "react-router-dom"
import { useTitle } from "../../hooks/useTitle"
import { useGetOrderByIdQuery } from "../../services/orderApi"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { useEffect } from "react"
import { fetchError } from "../../utils/fetchError"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import LoadFail from "../ui/LoadFail"
import LoadData from "../ui/LoadData"
import OrderItems from "./OrderItems"

const OrderDetails = () => {
    useTitle('Order Info')
    const { id } = useParams()
    const { data, isError, error, isLoading } = useGetOrderByIdQuery({ id: id || '' })
    const { user } = useSelector((state: RootState) => state.auth)
    const paymentStatus = data?.order.paymentInfo.status === 'succeeded' ? 'Paid' : 'Not Paid'
    const hasDelivered = data?.order.orderStatus === 'Delivered'

    useEffect(() => {
        if (isError) {
            fetchError(error as FetchBaseQueryError)
        }
    }, [error, isError])

    if (error) return <LoadFail />
    if (isLoading) return <LoadData message='Render responding...' />

    return (<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10  text-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Order #{data?.order._id}</h1>

        <div className="mb-4 font-mono">
            <h2 className="text-lg font-semibold mb-2 text-shadow-2xs">Shipping Info</h2>
            <p><span className="font-semibold">Name:</span> {user?.name || 'N/A'}</p>
            <p><span className="font-semibold">Phone:</span> {data?.order.shippingInfo.phoneNo}</p>
            <p className="mb-2"><span className="font-semibold">Address:</span> {data?.order.shippingInfo.address},
                {data?.order.shippingInfo.city}, {data?.order.shippingInfo.postalCode}, {data?.order.shippingInfo.country}</p>
            <p><span className="font-semibold">Amount:</span> kr {data?.order.totalPrice}</p>
        </div>

        <hr className="my-6 text-gray-300" />

        <div className="mb-8 font-mono flex justify-between">
            <div className="flex-1 ">
                <h2 className="text-lg font-semibold mb-2 text-shadow-2xs">Payment Info</h2>
                <p><span className="font-semibold">Payment Status:</span>
                    <span className={`${paymentStatus.includes('Paid') ? 'text-teal-500' : 'text-blue-600'}`}>
                        {''} {paymentStatus}
                    </span></p>
                <p><span className="font-semibold">Paid At:{''} </span>{data?.order.paidAt ? new Date(data.order.paidAt).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }) : 'N/A'}</p>
            </div>

            <div className="flex-2">
                <h2 className="text-lg font-semibold mb-2 text-shadow-2xs">Order Info</h2>
                <p><span className="font-semibold">Order Status:</span>
                    <span className={`${hasDelivered ? 'text-teal-900' : 'text-blue-600'}`}>{''} {data?.order.orderStatus}</span></p>
                {hasDelivered &&
                    <p>
                        <span className="font-semibold">Delivered At:{''}
                        </span>
                        {data?.order.paidAt ? new Date(data.order.paidAt).toLocaleString('en-GB', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        }) : 'N/A'}
                    </p>}
            </div>
        </div>
        <hr className="my-6 text-gray-300" />
        <OrderItems data={data?.order.orderItems || []} />

    </div>)
}
export default OrderDetails