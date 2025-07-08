import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
    const [searchParams] = useSearchParams()
    return {
        keyword: searchParams.get('keyword') || '',
        page: parseInt(searchParams.get('page') || '1', 10),
        category: searchParams.get('category') || '',
    }
}