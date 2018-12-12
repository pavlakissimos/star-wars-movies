import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './app/Header';
import MovieList from './app/MovieList';
import Movie from './app/Movie';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <MovieList />
            </div>
            <div className="divider d-md-block d-none" />
            <div className="col-md-6 pt-4">
              <Movie movie={this.props.selectedMovie} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedMovie: state.movies.selectedMovie
  };
}

export default connect(mapStateToProps)(App);
