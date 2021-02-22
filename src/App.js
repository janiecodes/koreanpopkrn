import "./index.css";
import Movie from "./Components/Movie";
import React, { useEffect, useState } from "react";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API = 
'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const query = 'Jurassic Park'

const url = 'https://api.themoviedb.org/3/search/movie?api_key=3319e88ba0e214d43905d5d6829976bd&language=en-US&query=${query}&page=1&include_adult=false'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);

  const getMovies = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      let res = data.results
      res = res.map(item => {
        const {...id} = item
        return {...id}
      })
      console.log(data);
      setMovies(res);
    });
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('submitting')
    if(searchTerm){
      getMovies(SEARCH_API + searchTerm)
    
    setSearchTerm('');
  }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  //whatever is in the return is what gets displayed on the screen
  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
        <input 
        className="search" 
        type="search" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={handleOnChange}/>
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
