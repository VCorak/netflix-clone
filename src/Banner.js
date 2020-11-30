import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import Key from "./Key";




import "./Banner.css";


function Banner() {
  const [movie, setMovie] = useState([]); // [] -> witchever movie loads show it


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals); //you can make this whatever you want, Trend, Action...
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      ); // if [] -> object, just grabbing random movies minus 1, not to overpass it
      return request;
    }
    fetchData();
  }, []); // piece of code which runs based on a given condition, [] -> means that will run only once, when loaded

  //console.log(movie);

  function truncate(str, n) {
    return (str?.length) > n ? str?.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${Key.tmdb.basePosterUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fade-bottom" />
    </header>
  );
}

export default Banner;

// ? (it is called optional channing) means that if any error (like not showing the picture, do this instead)
// banner--fadeBottom-> modifier
