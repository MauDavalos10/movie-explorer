import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "./movieSlice";

const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState: [] as Movie[],
  reducers: {
    toggleFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      const movieIndex = state.findIndex(
        (movie) => movie.imdbID === action.payload.imdbID,
      );
      if (movieIndex >= 0) {
        state.splice(movieIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { toggleFavoriteMovie } = favoriteMovieSlice.actions;
export default favoriteMovieSlice.reducer;
