import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieItem from '../MovieItem';

import { getMovies, selectMovie } from './actions';

class MovieList extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    return (
      <div>
        {this.props.movies &&
          this.props.movies.map(movie => (
            <MovieItem
              key={movie.id}
              episode={movie.fields.episode_id}
              title={movie.fields.title}
              date={movie.fields.release_date}
              selectMovie={() => this.props.selectMovie(movie.id)}
              selected={
                this.props.selectedMovie
                  ? this.props.selectedMovie.id === movie.id
                  : ''
              }
            />
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.movies,
    selectedMovie: state.movies.selectedMovie,
    selectedFilter: state.movies.selectedFilter
  };
}

export default connect(
  mapStateToProps,
  { getMovies, selectMovie }
)(MovieList);
