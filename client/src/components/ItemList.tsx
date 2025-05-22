import { useEffect, useState } from "react"
import Card from "./Card"
import instance from "../api/axios"

const ItemList = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        instance.get('/items').
            then((response) => setItems(response.data)).catch((error) => console.error(error))
    }, [])

    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-5">
        {items.map((item) =>
            <Card data={item} />
        )}
    </div>)
}
export default ItemList