import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Navbar = () => {
    const cookies =  new Cookies()
    const [token, setToken] = useState(cookies.get('token'))
    const [username, setUsername] = useState('')
    const history = useHistory()

    useEffect(()=>{
        if (token){
            fetch('http://localhost:8000/api/v1/dj-rest-auth/user', {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json', 
                    Authorization : `Token ${token}`
                }
            }).then((res) => {
                if (!res.ok){ 
                    throw Error(`Error ${res.status}: data could not be fetched`)
                }
                return res.json()
            }).then((data)=>{
                setUsername(data.username)
            }).catch((e)=>(
                console.log(e.message)
            ))
        }
    }, [token])

    const handleLogout = () => {
        fetch('http://localhost:8000/api/v1/dj-rest-auth/logout/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json', 
                Authorization : `Token ${token}`
            }
        }).then((res) => {
            if (!res.ok){ 
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
            return res.json()
        }).then((data) => {
            setToken(null)
            cookies.remove('token')
            history.push('/login')
        }).catch((err) => {
            console.log(err.message)
        })
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