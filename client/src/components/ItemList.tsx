import { useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios"

const ItemList = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/items`).
            then((response) => setItems(response.data)).catch((error) => console.error(error))
    }, [])

    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item) =>
            <Card data={item} />
        )}
    </div>)
}
export default ItemList