import { useNavigate, useSearchParams } from "react-router-dom";

export function useRedirectAfterLogin(defaultPath = 'home') {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const redirectPath = searchParams.get("redirects") || defaultPath
    return () => {
        navigate(`/${redirectPath}`, { replace: true })
    }
}