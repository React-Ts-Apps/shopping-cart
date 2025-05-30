import { useEffect, useState } from "react"
import type { ItemProps } from "../../types"
import instance from "../../api/axios"
import LoadData from "../ui/LoadData"


const ProductList = () => {
    const [data, setData] = useState<ItemProps[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        instance.get('/admin/items').
            then((res) => {
                setData(res.data)
                setLoading(false)
            }).
            catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [])
    return (
        <div>
            {loading ? <LoadData message="Render responding..." /> :
                <div className="space-y-4 max-w-3xl p-10  mx-auto">
                    <h2 className="font-semibold">Added Items({data.length})</h2>
                    <div className="overflow-x-auto">
                        <table className="border border-gray-200 rounded-lg shadow-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 text-left border-b">ItemNo</th>
                                    <th className="py-2 px-4 text-left border-b">Name</th>
                                    <th className="py-2 px-4 text-left border-b">Description</th>
                                    <th className="py-2 px-4 text-left border-b">Price</th>
                                    <th className="py-2 px-4 text-left border-b">Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 text-left border-b">{index + 1}</td>
                                            <td className="py-2 px-4 text-left border-b">{item.name}</td>
                                            <td className="py-2 px-4 text-left border-b">{item.description}</td>
                                            <td className="py-2 px-4 text-left border-b">{item.price}kr</td>
                                            <td className="py-2 px-4 text-left border-b">
                                                <img src={item.imgSrc} alt={item.name} className="w-16 h-16" /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )

}
export default ProductList