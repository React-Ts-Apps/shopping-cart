import { useEffect, useState } from "react"
import Card from "../ui/Card"
import instance from "../../api/axios"
import LoadData from "../ui/LoadData"

const ItemList = () => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        instance.get('/items').
            then((response) => {
                setItems(response.data)
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-5">
                    {items.map((item, index) =>
                        <Card key={index} data={item} />
                    )}
                </div>
            }
        </div>)
}
export default ItemList