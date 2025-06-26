import ReactPaginate from "react-paginate"
import type { PaginateProps } from "../../types"

const Paginate = ({ pageCount, onPageChange }: PaginateProps) => {
    return (
        <ReactPaginate
            initialPage={0}
            pageCount={pageCount}
            onPageChange={({ selected }) => onPageChange(selected)}
            containerClassName="flex gap-2 list-none"
            pageClassName="px-3 py-1 border rounded cursor-pointer"
            activeClassName="bg-orange-400 text-white"
            pageRangeDisplayed={5}
            previousLabel='←'
            nextLabel='→'
            previousClassName="px-3 py-1 border rounded"
            nextClassName="px-3 py-1 border rounded"
            breakLabel="..."
            renderOnZeroPageCount={null} />
    )
}
export default Paginate

