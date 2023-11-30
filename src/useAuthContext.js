import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('use AuthContext must be inside an AuthContextProvider')
    }

    return context
}