import { useContext } from "react"
import { userContext } from "../../providers/UserContext"
import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoutes = () => {
    const { user } = useContext(userContext);

    return user ? <Outlet /> : <Navigate to="/" />;


}