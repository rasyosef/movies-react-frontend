import { useAuthContext } from "./useAuthContext";
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { token } = useAuthContext()
    return token ? children : <Navigate to='/login' />;
}
 
export default PrivateRoute;