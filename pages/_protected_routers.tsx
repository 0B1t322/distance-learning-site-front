import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AppStateType } from "./redux/store"

export const PrivateRouter = ({protectedRoutes, children}) => {
    const router = useRouter()
    const isUserLogin = useSelector((state:AppStateType) => state.auth.isLogin)

    const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(
        () => {
            if (pathIsProtected && !isUserLogin) {
                router.push('/')
            }
        }, [pathIsProtected, isUserLogin]
    )
    
    if (pathIsProtected && !isUserLogin) {
        return <div></div>
    }

    return children
}