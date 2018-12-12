import axios from 'axios';

import { GET_MOVIES, SELECT_MOVIE } from './types';
import {
  SELECT_FILTER,
  FILTER_BY_EPISODE,
  FILTER_BY_YEAR,
  SEARCH_BY_NAME
} from '../Header/types';

const url = 'https://star-wars-api.herokuapp.com/films';

const filterActions = {
  Year: {
    action: dispatch => dispatch({ type: FILTER_BY_YEAR })
  },
  Episode: {
    action: dispatch => dispatch({ type: FILTER_BY_EPISODE })
  }
};

export function getMovies() {
  return dispatch => {
    axios.get(url).then(movies => {
      dispatch({ type: GET_MOVIES, movies: movies.data });
    });
  };
}

export function selectMovie(id) {
  return dispatch => {
    dispatch({ type: SELECT_MOVIE, id });
  };
}

export function selectFilter(filter) {
  return dispatch => {
    dispatch({ type: SELECT_FILTER, filter });

    if (!filter) {
      return axios.get(url).then(movies => {
        dispatch({ type: GET_MOVIES, movies: movies.data });
      });
    }

    filterActions[filter].action(dispatch);
  };
}

export function searchByName(searchInput) {
  return dispatch => {
    dispatch({ type: SEARCH_BY_NAME, searchInput });
  };
}
