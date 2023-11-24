import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Movies</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/add">Add Movie</Link>
            </div>
        </nav>
    )
}

export default Navbar;