import React from 'react';

const MovieItem = ({ episode, title, date, selectMovie, selected }) => (
  <div
    className={`row pl-lg-5 py-2 movie-item ${selected ? 'active-item' : ''}`}
    onClick={selectMovie}
  >
    <div className="col-3 movie-item-episode">Episode {episode}</div>
    <div className=" col-6">{title}</div>
    <div className="col-3 movie-item-date">{date}</div>
  </div>
);

export default MovieItem;
