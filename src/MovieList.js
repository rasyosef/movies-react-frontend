const MovieList = ({ movies }) => {
    return ( 
        <div className="movie-list">
            {movies.map((movie)=>(
                <div className="movie-preview" key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p><b>Director:</b> {movie.director}</p>
                    <p><b>Description:</b> {movie.description}</p>
                </div>
            ))}
        </div>
     );
}
 
export default MovieList;