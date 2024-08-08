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
  const [watched, setWatched] = useState(tempWatchedData);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(""); 
  const [query, setQuery] = useState("")

  useEffect(() => { 
    if (query.length < 3) {
      return setMovies([]), setError("");
      
    }

    fetchData(query);
  }, [query])

  async function fetchData(query) {
    try {
      setLoader(true);
      setError("");
      
      const data = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      if (!data.ok) throw new Error("Something went wrong");
    
      const res = await data.json(); 
      if (res.Response === 'False') throw new Error("Movie not found");

      const getData = res.Search;
      setMovies(getData);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
    // Always runs
    finally { 
      setLoader(false);
    }
  }
  

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
              {!loader && !error && <Movies movies={movies}/>}
          </Box>

          <Box>
              <MoviesSummary watched={watched} average={average}/>
              <WatchedMovies watched={watched}/>
          </Box>
      </PopCornMain>
    </>
  ) 
} 