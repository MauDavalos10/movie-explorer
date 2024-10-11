import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
// @ts-ignore
import configureStore from "redux-mock-store";
import { toggleFavoriteMovie } from "../../redux/slices/favoriteMovieSlice";
import { Movie } from "../../redux/slices/movieSlice";
import MovieCard from "../MovieCard";

const mockStore = configureStore([]);
const initialState = {
  favoriteMovie: [],
};

const mockMovie: Movie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Type: "movie",
  Poster: "https://fake-images/images/test-image.jpg",
};

describe("MovieCard Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("renders movie details correctly", () => {
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>,
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Movie")).toBeInTheDocument();
  });

  it("displays the correct favorite icon based on favorite state", () => {
    const updatedState = {
      favoriteMovie: [mockMovie],
    };
    store = mockStore(updatedState);

    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>,
    );

    expect(screen.getByTestId("StarIcon")).toBeInTheDocument();
  });

  it("toggles favorite state when button is clicked", () => {
    render(
      <Provider store={store}>
        <MovieCard movie={mockMovie} />
      </Provider>,
    );

    const favoriteButton = screen.getByRole("button");
    expect(screen.getByTestId("StarBorderIcon")).toBeInTheDocument();

    fireEvent.click(favoriteButton);

    expect(store.dispatch).toHaveBeenCalledWith(toggleFavoriteMovie(mockMovie));
  });
});
