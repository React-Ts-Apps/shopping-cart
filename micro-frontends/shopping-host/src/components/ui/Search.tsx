import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Search = () => {
    const [keyWord, setKeyWord] = useState('')
    const navigate = useNavigate()

    const searchHandler = () => {
        navigate(`/search/${keyWord}`)
    }
    return (
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden max-w-md w-full">
            <input
                type="text"
                id="search_field"
                value={keyWord}
                className="w-full px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Search here ..."
                onChange={(e) => setKeyWord(e.target.value)}

            />
            <button
                id="search_btn"
                className="bg-orange-300 hover:bg-teal-700 text-white px-4 py-2.5"
                onClick={searchHandler}
            >
                <FaSearch />
            </button>
        </div>
    )
}
export default Search