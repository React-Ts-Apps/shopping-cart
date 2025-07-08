import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export function useUpdateSearchParams() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    return (params: Record<string, string>, reset = false) => {
        const newParams = reset ? new URLSearchParams() : searchParams
        for (const key in params) {
            const val = params[key].trim()
            if (val) newParams.set(key, val)
        }
        navigate(`${location.pathname}?${newParams.toString()}`)
    }
}