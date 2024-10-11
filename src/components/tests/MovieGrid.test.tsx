import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
// @ts-ignore
import configureStore from "redux-mock-store";
import MovieGrid from "../MovieGrid";

jest.mock("../MovieCard", () => ({ movie }: any) => (
  <div data-testid="movie-card">{movie.title}</div>
));
jest.mock("../NoResults", () => () => (
  <div data-testid="no-results">No results found</div>
));
jest.mock("../CustomPagination", () => () => (
  <div data-testid="pagination">Pagination</div>
));
jest.mock("../CustomSpinner", () => () => (
  <div data-testid="custom-spinner">Loading...</div>
));

const mockStore = configureStore([]);

describe("MovieGrid Component", () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner when status is loading", () => {
    store = mockStore({
      movies: { status: "loading", results: [], error: null },
    });

    render(
      <Provider store={store}>
        <MovieGrid />
      </Provider>,
    );

    expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
  });

  it("renders error message when status is failed", () => {
    store = mockStore({
      movies: { status: "failed", results: [], error: "Error message" },
    });

    render(
      <Provider store={store}>
        <MovieGrid />
      </Provider>,
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders NoResults component when status is not-found", async () => {
    store = mockStore({
      movies: { status: "not-found", results: [], error: null },
    });

    render(
      <Provider store={store}>
        <MovieGrid />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("no-results")).toBeInTheDocument();
    });
  });

  it("renders movie cards and pagination when results are available", async () => {
    const mockMovies = [
      { imdbID: "1", title: "Movie 1" },
      { imdbID: "2", title: "Movie 2" },
    ];

    store = mockStore({
      movies: { status: "succeeded", results: mockMovies, error: null },
    });

    render(
      <Provider store={store}>
        <MovieGrid />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
    });
  });

  it("does not render pagination when results are empty", async () => {
    store = mockStore({
      movies: { status: "succeeded", results: [], error: null },
    });

    render(
      <Provider store={store}>
        <MovieGrid />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });
  });
});
