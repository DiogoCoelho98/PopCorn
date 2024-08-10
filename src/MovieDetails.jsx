import StarRating from "./StarRating.jsx";
import Loader from "./Loader.jsx";

import { useEffect, useState } from "react";


const API_KEY = "19922d20";

export default function MovieDetails({selectedID, onHandleCloseSelectedID, onHandleAddWatched, watched}) {
    const [movieDetails, setMovieDetails] = useState({});
    const [loader, setLoader] = useState(false);
    const [userRating, setUserRating] = useState("");

    const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movieDetails;

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedID);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedID)?.userRating;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedID,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]),
            userRating: Number(userRating)
        }   

        onHandleAddWatched(newWatchedMovie);
        onHandleCloseSelectedID();
    }

    useEffect(() => {
        async function getMoviesData() {
            setLoader(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`);
            const data = await res.json();
            setMovieDetails(data);
            setLoader(false);
        }
        getMoviesData();
    }, [selectedID])

    return (
        <div className="details">
            {loader ? <Loader /> : 
            <>
                <header>
                    <button className="btn-back" onClick = {onHandleCloseSelectedID}>&larr;</button>
                    <img src={poster} alt={title} />
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p><span>⭐</span>{imdbRating} IMDB rating</p>
                    </div>
                </header>

                <section>
                    <div className="rating">
                        {!isWatched ?
                        <>
                            <StarRating maxRating = {10} color = "#fcc419" size = {20} onUserRating = {setUserRating}/>
                            {userRating > 0 && <span><button className="btn-add" onClick = {handleAdd}>Add to Watch List</button></span>}
                        </> : 
                        <p style={{textAlign: "center"}}>You already reviewed this movie <span style={{color: "#fcc419"}}>({watchedUserRating})</span></p>
                        }
                    </div>
                    
                    

                    <p><em>{plot}</em></p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>   
            </>
            }
        </div>
    )
}