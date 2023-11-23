import { useEffect, useState } from "react";
import MovieList from "./MovieList";

const Home = () => {
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(null)
    useEffect(()=>{
        fetch('http://localhost:8000/api/v1/').then((res) => {
            if (res.ok){ 
                return res.json()
            }
            else {
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
        }).then((data) => {
            setMovies(data)
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
        })
    }, [])

    return (
        <div className="home">
            {!movies && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies && <MovieList movies={movies} />}
        </div>
    )
}

export default Home;