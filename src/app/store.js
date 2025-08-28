import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/moviesSlice';
import favoritesReducer from '../features/favoritesSlice';

export default configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});
