import { useContext } from "react"
import { userContext } from "../../providers/UserContext";
import { Dashboard } from "./Dashboard";
import { LoginPage } from "./LoginPage";


export const HomePage = () => {
    const { user } = useContext(userContext);

    return (
        <main>
            {user ? (
                <Dashboard />
            ) : (
                <LoginPage />
            ) }
        </main>
    )
}