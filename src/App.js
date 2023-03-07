import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import Movie from "./components/Movie";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  const page = 1;

  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&region=IN&page=${page}&with_original_language=${language}`;
  // https://api.themoviedb.org/3/discover/movie?api_key=[MY_KEY]&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi
  const IMG_API = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&with_original_language=${language}&query=`;

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, [language]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }
    setSearchTerm();
  };
  const handleOnchange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <button onClick={() => setLanguage("te")}>telugu movies</button>
        <button onClick={() => setLanguage("hi")}>hindhi movies</button>
        <button onClick={() => setLanguage("en")}>english movies</button>

        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnchange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((it) => <Movie key={it.id} {...it} />)}
      </div>
    </>
  );
}

export default App;
