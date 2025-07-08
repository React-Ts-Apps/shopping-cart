import ReactPaginate from "react-paginate"
import type { PaginateProps } from "../../types"

const Paginate = ({ pageCount, onPageChange, currentPage }: PaginateProps) => {
    return (
        <ReactPaginate
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={({ selected }) => onPageChange(selected)}
            containerClassName="flex gap-2 list-none"
            pageClassName="border rounded cursor-pointer"
            pageLinkClassName="block px-3 py-1 w-full h-full"
            activeClassName="bg-orange-400 text-white"
            activeLinkClassName="text-white"
            pageRangeDisplayed={3}
            previousLabel="←"
            nextLabel="→"
            previousClassName="border rounded cursor-pointer"
            previousLinkClassName="block px-3 py-1"
            nextClassName="border rounded cursor-pointer"
            nextLinkClassName="block px-3 py-1"
            breakLabel="..."
            breakClassName="border rounded"
            breakLinkClassName="block px-3 py-1"
            renderOnZeroPageCount={null}
        />

    )
}
export default Paginate

