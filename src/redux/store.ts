import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/movieSlice";
import queryReducer from "./slices/querySlice";
import pageIndexReducer from "./slices/pageIndexSlice";
import favoriteMovieReducer from "./slices/favoriteMovieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    query: queryReducer,
    pageIndex: pageIndexReducer,
    favoriteMovie: favoriteMovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
