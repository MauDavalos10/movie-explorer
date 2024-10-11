import favoriteMovieReducer, {
  toggleFavoriteMovie,
} from "../favoriteMovieSlice";
import { RootState } from "../../store";
import { Movie } from "../movieSlice";

describe("favoriteMovie reducer", () => {
  const initialState: Movie[] = [];

  it("should return the initial state", () => {
    expect(favoriteMovieReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle toggleFavoriteMovie when adding a movie", () => {
    const movie: Movie = {
      imdbID: "1",
      Title: "Test Movie",
      Poster: "test.jpg",
      Year: "2023",
      Type: "movie",
    };
    const newState = favoriteMovieReducer(
      initialState,
      toggleFavoriteMovie(movie),
    );
    expect(newState).toEqual([movie]);
  });

  it("should handle toggleFavoriteMovie when removing a movie", () => {
    const movie: Movie = {
      imdbID: "1",
      Title: "Test Movie",
      Poster: "test.jpg",
      Year: "2023",
      Type: "movie",
    };
    const stateWithMovie = [movie];
    const newState = favoriteMovieReducer(
      stateWithMovie,
      toggleFavoriteMovie(movie),
    );
    expect(newState).toEqual([]);
  });

  it("should handle toggleFavoriteMovie with multiple movies", () => {
    const movie1: Movie = {
      imdbID: "1",
      Title: "Movie 1",
      Poster: "test1.jpg",
      Year: "2023",
      Type: "movie",
    };
    const movie2: Movie = {
      imdbID: "2",
      Title: "Movie 2",
      Poster: "test2.jpg",
      Year: "2023",
      Type: "movie",
    };
    const movie3: Movie = {
      imdbID: "3",
      Title: "Movie 3",
      Poster: "test3.jpg",
      Year: "2023",
      Type: "movie",
    };

    let state = favoriteMovieReducer(initialState, toggleFavoriteMovie(movie1));
    state = favoriteMovieReducer(state, toggleFavoriteMovie(movie2));
    state = favoriteMovieReducer(state, toggleFavoriteMovie(movie3));
    expect(state).toEqual([movie1, movie2, movie3]);

    state = favoriteMovieReducer(state, toggleFavoriteMovie(movie2));
    expect(state).toEqual([movie1, movie3]);

    state = favoriteMovieReducer(state, toggleFavoriteMovie(movie1));
    expect(state).toEqual([movie3]);
  });

  it("should not modify state when toggling a non-existent movie", () => {
    const movie1: Movie = {
      imdbID: "1",
      Title: "Movie 1",
      Poster: "test1.jpg",
      Year: "2023",
      Type: "movie",
    };
    const movie2: Movie = {
      imdbID: "2",
      Title: "Movie 2",
      Poster: "test2.jpg",
      Year: "2023",
      Type: "movie",
    };

    const state = [movie1];
    const newState = favoriteMovieReducer(state, toggleFavoriteMovie(movie2));
    expect(newState).toEqual([movie1, movie2]);
  });
});

describe("favoriteMovie selectors", () => {
  it("should select the favoriteMovie from the root state", () => {
    const movie: Movie = {
      imdbID: "1",
      Title: "Test Movie",
      Poster: "test.jpg",
      Year: "2023",
      Type: "movie",
    };
    const mockRootState = {
      favoriteMovie: [movie],
    } as RootState;

    expect(mockRootState.favoriteMovie).toEqual([movie]);
  });
});
