import { FaSearch } from "react-icons/fa"

const Search = () => {
    return (
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden max-w-md w-full">
            <input
                type="text"
                id="search_field"
                className="w-full px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Search here ..."

            />
            <button
                id="search_btn"
                className="bg-orange-300 hover:bg-teal-700 text-white px-4 py-2.5"
            >
                <FaSearch />
            </button>
        </div>
    )
}
export default Search