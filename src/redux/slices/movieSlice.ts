import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { searchMoviesAPI } from "../../services/api";

export interface ResultRequest {
  Response: string;
  Error?: string;
  Search?: Movie[];
}

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

interface MoviesState {
  results: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed" | "not-found";
  error: string | null;
}

const initialState: MoviesState = {
  results: [],
  status: "idle",
  error: null,
};

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, pageIndex }: { query: string; pageIndex: number }) => {
    return await searchMoviesAPI(query, pageIndex);
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
        (state, action: PayloadAction<ResultRequest>) => {
          state.status =
            action.payload.Response === "True" ? "succeeded" : "not-found";
          state.results = action.payload.Search ?? [];
        },
      )
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
