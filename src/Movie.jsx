export default function Movie({ movie, onHandleSelectedID }) {
    return (
        <li onClick = {() => onHandleSelectedID(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p> <span>🗓</span> <span>{movie.Year}</span></p>
            </div>
        </li>
    )
}