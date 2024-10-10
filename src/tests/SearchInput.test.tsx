import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchInput from "../components/SearchInput";

jest.mock("../redux/slices/querySlice", () => ({
  setQuery: jest.fn((query) => ({ type: "mocked-set-query", payload: query })),
}));

jest.mock("../redux/slices/movieSlice", () => ({
  searchMovies: jest.fn((params) => ({
    type: "mocked-search-movies",
    payload: params,
  })),
}));

const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case "mocked-set-query":
    case "mocked-search-movies":
      return { ...state, lastAction: action.type, lastPayload: action.payload };
    default:
      return state;
  }
};

describe("SearchInput", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>,
    );

    expect(
      screen.getByPlaceholderText("Search for a movie..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>,
    );

    const input = screen.getByPlaceholderText(
      "Search for a movie...",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Inception" } });

    expect(input.value).toBe("Inception");
  });
});
