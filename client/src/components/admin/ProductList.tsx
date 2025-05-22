import { useEffect, useState } from "react"
import instance from "../../api/axios"
import type { ItemProps } from "../../types"

const ProductList = () => {
    const [data, setData] = useState<ItemProps[]>([])
    useEffect(() => {
        instance.get('/admin/items').then((res) => setData(res.data)).catch((error) => console.error(error))
    }, [])
    return (
        <div>
            <h2 className=" p-5 pl-10 font-semibold">Product List</h2>
            <div className="overflow-x-auto">
                <table className="border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left border-b">Name</th>
                            <th className="py-2 px-4 text-left border-b">Description</th>
                            <th className="py-2 px-4 text-left border-b">Price</th>
                            <th className="py-2 px-4 text-left border-b">Image Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 text-left border-b">{item.name}</td>
                                    <td className="py-2 px-4 text-left border-b">{item.description}</td>
                                    <td className="py-2 px-4 text-left border-b">{item.price}kr</td>
                                    <td className="py-2 px-4 text-left border-b">{item.imgSrc}</td>
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