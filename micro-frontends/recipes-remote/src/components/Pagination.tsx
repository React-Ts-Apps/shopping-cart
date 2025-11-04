
import { useNavigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../constants";
import { useRecipesStore } from "../store/RecipesStore";
import { useSelectedList } from "../hooks/useSelectedList";

const Pagination = ({ menuLength }: { menuLength: number }) => {
  const { currentPage, setCurrentPage, mealHubItem } = useRecipesStore();
  const base = useSelectedList()
  const navigate = useNavigate()
  const itemsLength = Math.ceil(menuLength / ITEMS_PER_PAGE);
  const pages = [];
  for (let i = 1; i <= itemsLength; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    navigate(`/recipes/${mealHubItem}/${base}/page/${page}`, { replace: true })
  }

  return (
    <section>
      <div className="pl-50 pr-30">
        <ul className="flex flex-wrap gap-md justify-center pb-50 mt-10">
          {pages.map((page, index) => (
            <li
              key={index}
              className={`w-[30px] h-[30px] border border-gray-400 mx-1 flex items-center justify-center cursor-pointer p-2 transition-all ease-in-out text-white ${currentPage === page ? "bg-black" : "bg-orange-600 hover:bg-black"}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Pagination;
