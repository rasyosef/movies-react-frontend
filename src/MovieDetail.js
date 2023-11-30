import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const MovieDetail = () => {
    const { id } = useParams()

    const [movie, setMovie] = useState(null)
    const [error, setError] = useState(null)

    const {token, userid} = useAuthContext()

    useEffect(()=>{
        fetch(`http://localhost:8000/api/v1/${id}/`, {
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
        }).then((data) => {
            setMovie(data)
            setError(null)
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
        })
    }, [id, token])

    return (
        <div>
            {!movie && !error && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movie && <div className="movie-detail">
                <img src={movie.image} alt="" width={600} height={600}/>
                <h2>{movie.title}</h2>
                <p><b>Year:</b> {movie.year_of_release}</p>
                <p><b>Director:</b> {movie.director}</p>
                <p><b>Writers:</b> {movie.writers}</p>
                <p><b>Genre:</b> {movie.categories}</p>
                <p><b>Description:</b> {movie.description}</p>
                {movie.created_by === userid && <Link to={`/movies/${id}/edit`}><button>Edit</button></Link>}
                {movie.created_by === userid && <Link to={`/movies/${id}/delete`}><button>Delete</button></Link>}
            </div>}
        </div>
    )
}

export default MovieDetail;