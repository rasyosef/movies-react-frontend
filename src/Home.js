import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import { useAuthContext } from "./useAuthContext";

const Home = () => {
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(null)

    const {token} = useAuthContext()
    
    useEffect(()=>{
        axios.get('https://movies-django-backend.vercel.app/api/v1/', {
            headers : {
                'Content-Type' : 'application/json', 
                Authorization : `Token ${token}`
            }
        }).then(({ data }) => {
            setMovies(data)
            setError(null)
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
        })
    }, [token])

    return (
        <div className="home">
            {!movies && !error && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies && <MovieList movies={movies} />}
        </div>
    )
}

export default Home;