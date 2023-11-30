import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
    return ( 
        <div className="movie-list">
            <h2>Movies</h2>
            {movies.map((movie)=>(
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <div className="movie-preview">
                        <h2>{movie.title}</h2>
                        <p><b>Director:</b> {movie.director}</p>
                        <p><b>Description:</b> {movie.description}</p>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default MovieList;