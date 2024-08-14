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
import ReactLoading from "react-loading";

import { useState, useEffect } from "react";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function() {
      const storedValue = JSON.parse(localStorage.getItem("watched"));
      return storedValue;
    });
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
        const response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${query}`, { signal: controller.signal });
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
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <NavBar>
          <Search query = {query} setQuery = {setQuery}/>
          <NumResults movies={movies}/>
      </NavBar>

      <PopCornMain query={query}> 
          <Box>
              {loader && <Loader><ReactLoading type="spinningBubbles" color="#ffffff"/></Loader>}
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