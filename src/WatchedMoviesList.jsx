import WatchedMovie from "./WatchedMovie";

export default function WatchedMovies({ watched }) {
    return (
        <ul className="list">
                {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID}/>)}
              </ul>
    )
}