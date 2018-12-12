import { combineReducers } from 'redux';

import movies from './app/MovieList/reducer';

export const rootReducer = combineReducers({
  movies
});
