import React, { useState, type FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import type { ShippingProps } from "../../types"
import { countries } from 'countries-list'
import { saveShippingInfo } from "../../redux/features/cart/cartSlice"
import { useNavigate } from "react-router-dom"
import CheckoutGuide from "./CheckoutGuide"
import { useTitle } from "../../hooks/useTitle"

const ShippingDetails = () => {
    const { shippingInfo } = useSelector((state: RootState) => state.cart)
    const [shippingData, setShippingData] = useState<ShippingProps>(shippingInfo)
    const countriesList = Object.values(countries)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useTitle('Shipping Info')

    const shippingHandler = (e: FormEvent) => {
        e.preventDefault()
        localStorage.setItem('shippingInfo', JSON.stringify(shippingData))
        dispatch(saveShippingInfo(shippingData))
        navigate('/confirm/order', { replace: true })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShippingData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <CheckoutGuide hasItems shipping />
            <div className="flex justify-center font-serif items-start min-h-screen  bg-gray-100 px-4 pt-5">
                <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
                    <form onSubmit={shippingHandler} className="space-y-6">
                        <h1 className="text-2xl font-semibold mb-6">Shipping Details</h1>

                        <div>
                            <label htmlFor="address_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address_field"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500  border-gray-300"
                                value={shippingData.address}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="city_field" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city_field"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500  border-gray-300"
                                value={shippingData.city}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="postal_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postal_field"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500  border-gray-300"
                                value={shippingData.postalCode}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="country_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <select
                                id="country_field"
                                name="country"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500  border-gray-300"
                                value={shippingData.country}
                                defaultValue="Norway"
                                onChange={onChange}
                                required
                            >
                                {countriesList.map((country, i) => (
                                    <option key={`${country}-${i}`} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="phone_field" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone No
                            </label>
                            <input
                                type="text"
                                name="phoneNo"
                                id="phone_field"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500  border-gray-300"
                                value={shippingData.phoneNo}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button
                            id="shipping_button"
                            type="submit"
                            className="w-full py-3 rounded text-white font-semibold  bg-orange-400 hover:bg-teal-700">
                            Continue Checkout
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ShippingDetails