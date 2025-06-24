import { useEffect, useState } from "react"
import Card from "../product/Card"
import instance from "../../api/axios"
import LoadData from "../ui/LoadData"
import type { ItemProps } from "../../types"

const ItemList = () => {

    const [items, setItems] = useState<ItemProps[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        instance.get('/api/v1/products').
            then((response) => {
                setItems(response.data.products)
                setLoading(false)
            }).
            catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [])


    return (
        <div>
            {loading ? <LoadData message='Render responding...' /> :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {items?.map((item) =>
                        <Card key={item._id} data={item} />
                    )}
                </div>
            }
        </div>)
}
export default ItemList