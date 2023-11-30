import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useAuthContext } from './useAuthContext';

const Navbar = () => {
    const cookies =  new Cookies()
    const navigate = useNavigate()
    const { token, username, dispatch } = useAuthContext()

    const handleLogout = () => {
        cookies.remove('token')
        dispatch({type: 'LOGOUT'})
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <h1>Movies</h1>
            <div className="links">
                {token && <b>{username}</b>}
                {token && <Link to="/">Home</Link>}
                {token && <Link to="/add">Add Movie</Link>}
                {!token && <Link to="/signup">Signup</Link>}
                {!token && <Link to="/login">Login</Link>}
                {token && <button onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}

export default Navbar;