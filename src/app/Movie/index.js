import React from 'react';

const Movie = ({ movie }) => {
  if (movie) {
    return (
      <div className="px-lg-5">
        <h3 className="movie-title">{movie.fields.title}</h3>
        <p>{movie.fields.opening_crawl}</p>
        <div>Directed by: {movie.fields.director}</div>
      </div>
    );
  } else {
    return <div className="text-center">No Movie Selected</div>;
  }
};

export default Movie;
