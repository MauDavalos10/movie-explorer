import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { searchMoviesAPI } from "../../services/api";

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

interface MoviesState {
  results: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MoviesState = {
  results: [],
  status: "idle",
  error: null,
};

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string) => {
    const response = await searchMoviesAPI(query);
    return response.Search;
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        searchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.results = action.payload;
        },
      )
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
