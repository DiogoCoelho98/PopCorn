import NavBar from "./NavBar.jsx";
import Search from "./Search";
import NumResults from "./NumResults";
import PopCornMain from "./PopCornMain";
import Box from "./Box.jsx";
import Movies from "./Movies";
import MoviesSummary from "./MoviesSummary";
import WatchedMovies from "./WatchedMoviesList";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import MovieDetails from "./MovieDetails.jsx";

import { useState, useEffect } from "react";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "19922d20";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(""); 
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  function handleSelectedID(id) {
    setSelectedID(selectedID => id === selectedID ? null : id);
  }

  function handleCloseSelectedID() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id){
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController(); // Web API function

    if (query.length < 3) {
      setMovies([]);
      setError("");
      handleCloseSelectedID();
      return;
    }

    async function fetchData(query) {
      try {
        setLoader(true);
        setError("");
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Something went wrong");
        const res = await response.json();
        if (res.Response === 'False') throw new Error("Movie not found");
        const getData = res.Search;
        // Data to display in <Movies />
        setMovies(getData);
        setError("");

      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
        console.log(err.message); 
      }

      // Always runs
      finally {
        setLoader(false);
      }
    }
    fetchData(query);

    // Cleanup function
    return function() {
      controller.abort();
    };
  }, [query])

  return (
    <>
      <NavBar>
          <Search query = {query} setQuery = {setQuery}/>
          <NumResults movies={movies}/>
      </NavBar>

      <PopCornMain> 
          <Box>
              {loader && <Loader />}
              {error && <ErrorMessage message = {error}/>}
              {!loader && !error && <Movies movies={movies} onHandleSelectedID = {handleSelectedID}/>}
          </Box>

          <Box>
              {selectedID ? <MovieDetails selectedID = {selectedID} onHandleCloseSelectedID = {handleCloseSelectedID} onHandleAddWatched = {handleAddWatched} watched = {watched}/> :
              <> 
                <MoviesSummary watched={watched} average={average}/>
                <WatchedMovies watched={watched} onDeleteWatched={handleDeleteWatched}/>
              </>
              }
          </Box>
      </PopCornMain>
    </>
  ) 
} 