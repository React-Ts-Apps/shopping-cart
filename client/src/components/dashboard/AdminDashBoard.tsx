import instance from "../../api/axios"
import { useEffect, useState } from "react"

const AdminDashBoard = () => {
    const [data, setData] = useState('')
    useEffect(() => {
        instance.get('/admin').
            then((response) => setData(response.data)).
            catch((error) => console.error(error))
    })
    return (<div>{data}</div>)
}
export default AdminDashBoard