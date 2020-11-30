import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import movieTrailer from "movie-trailer";
import Key from "./Key";

import "./Row.css";



function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); // get the trailer url when I click on movie poster

  
//const base_url = "https://api.themoviedb.org/3";
  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if these bracket are empty [] that means- run once when the row loads, and don't run again, only on page load

    async function fetchData() {
      const request = await axios.get(fetchUrl); // <- go on the url and fetch request npr. "Trending now"
      // console.log(request.data.results); <- here we can check for results
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]); //<- this is call dependentcie, it is dependent and shows of as many times as npr. "movies" changes

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
     // https://developers.google.com/youtube/player_parameters//
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // <= when clicked on poster get me movie
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU      / with code written bellow we pull just the ID of movie, everything behind letter "v"
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //console.log(movies);

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">
            {movies.map((movie) => {
          return (
            <img
              key={movie?.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${Key.tmdb.basePosterUrl}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
