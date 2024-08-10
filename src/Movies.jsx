import Movie from "./Movie";

export default function Movies({ movies, onHandleSelectedID }) { 
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => <Movie movie={movie} onHandleSelectedID = {onHandleSelectedID} key={movie.imdbID}/>)}
          </ul>
    )
}