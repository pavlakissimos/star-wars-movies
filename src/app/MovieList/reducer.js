import { GET_MOVIES, SELECT_MOVIE } from './types';
import {
  FILTER_BY_EPISODE,
  FILTER_BY_YEAR,
  SEARCH_BY_NAME,
  SELECT_FILTER
} from '../Header/types';

const initialState = {
  movies: [],
  startingMovies: [],
  selectedMovie: '',
  selectedFilter: '',
  searchInput: ''
};

const filterMoviesByEpisode = (movies, filter) =>
  movies.sort((a, b) => a.fields[filter] - b.fields[filter]);

const filterMoviesByYear = (movies, filter) =>
  movies.sort(
    (a, b) => new Date(a.fields[filter]) - new Date(b.fields[filter])
  );

const withSearch = (movies, searchInput) =>
  movies.filter(movie => {
    const movieName = movie.fields.title.toLowerCase();
    return movieName.includes(searchInput.toLowerCase());
  });

export default function movies(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        startingMovies: action.movies
      };
    case SELECT_MOVIE:
      const selectedMovie = state.movies.filter(
        movie => movie.id === action.id
      );
      return {
        ...state,
        selectedMovie: selectedMovie[0]
      };
    case SELECT_FILTER:
      return {
        ...state,
        selectedFilter: action.filter
      };
    case FILTER_BY_EPISODE:
      const filterByEpisode = state.movies
        ? filterMoviesByEpisode(state.movies, 'episode_id')
        : [];
      return {
        ...state,
        movies: state.searchInput
          ? withSearch(filterByEpisode)
          : filterByEpisode
      };
    case FILTER_BY_YEAR:
      const filterByYear = state.movies
        ? filterMoviesByYear(state.movies, 'release_date')
        : [];
      return {
        ...state,
        movies: state.searchInput ? withSearch(filterByYear) : filterByYear
      };
    case SEARCH_BY_NAME:
      let filtered;

      let searchByName = withSearch(state.startingMovies, action.searchInput);

      if (state.selectedFilter === 'Year') {
        filtered = filterMoviesByYear(searchByName, 'release_date');
      }
      if (state.selectedFilter === 'Episode') {
        filtered = filterMoviesByEpisode(searchByName, 'episode_id');
      }
      return {
        ...state,
        movies: state.selectedFilter ? filtered : searchByName
      };
    default:
      return state;
  }
}
