import { useEffect, useState } from "react"
import instance from "../../api/axios"
import type { ItemProps } from "../../types"

const ProductList = () => {
    const [data, setData] = useState<ItemProps[]>([])
    useEffect(() => {
        instance.get('/admin/items').then((res) => setData(res.data)).catch((error) => console.error(error))
    }, [])
    return (
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
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 text-left border-b">{item.id}</td>
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
    )

}
export default ProductList