import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieList from '../movieList/movieList';



export default function Search() {

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=e9e9d8da18ae29fc430845952232787c&page=1&query=${query}`
      )
        .then((response) => response.json())
        .then((data) => {
          const keywordIds = data.results.map((result) => result.id);
          fetchMovieData(keywordIds);
        });
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const fetchMovieData = (keywordIds) => {
    const promises = keywordIds.map((id) =>
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.error(`Error fetching movie data for ID ${id}:`, error);
          return null;
        })
    );

    Promise.all(promises).then((results) => {
      const filteredResults = results.filter((result) => result !== null);
      const sortedResults = filteredResults.sort((a, b) => b.id - a.id);
      setSearchResults(sortedResults);
    });
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='movie__list' >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleInputChange}
        style={{ color: 'white' }}
      />

      {searchResults.length > 0 ? (
        <div className='list__cards'>
          {searchResults.filter((result) => result && result.id && result.poster_path).map((result) => (

            <Link to={`/movie/${result.id}`} style={{ textDecoration: 'none', color: 'white' }}>

              <div className='cards' key={result.id}>
                <img src={`https://image.tmdb.org/t/p/original/${result ? result.poster_path : ""}`} />
                <div className='cards__overlay'>
                  <div className='card__title'>{result ? result.title : ""}</div>
                  <div className='card__runtime'>
                    {result ? result.release_date : ""}
                    <span className='card__rating'>
                      {result ? result.vote_average : ""}
                      <i className='fas fa-star' />
                    </span>
                  </div>
                  {result && result.overview ? (
                    <div className='card__description'>{result ? result.overview.slice(0, 110) : ""}</div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (

        <MovieList />
      )}

    </div>
  );
}

