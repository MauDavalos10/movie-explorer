import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "../components/MovieCard";

jest.mock("@mui/material", () => ({
  Chip: ({ avatar, label, style }: any) => (
    <div data-testid="chip" style={style}>
      {avatar}
      {label}
    </div>
  ),
}));

jest.mock("@mui/icons-material/LocalMovies", () => () => (
  <span data-testid="local-movies-icon">LocalMoviesIcon</span>
));
jest.mock("@mui/icons-material/SmartDisplay", () => () => (
  <span data-testid="smart-display-icon">SmartDisplayIcon</span>
));
jest.mock("@mui/icons-material/Star", () => () => (
  <span data-testid="star-icon">StarIcon</span>
));

describe("MovieCard", () => {
  const mockMovie = {
    imdbID: "test-id-001",
    Title: "Test Movie",
    Year: "2023",
    Type: "movie",
    Poster: "https://example.com/poster.jpg",
  };

  it("renders movie information correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByTestId("local-movies-icon")).toBeInTheDocument();
    expect(screen.getByText("Movie")).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("uses placeholder image when Poster is N/A", () => {
    const movieWithoutPoster = { ...mockMovie, Poster: "N/A" };
    render(<MovieCard movie={movieWithoutPoster} />);

    const img = screen.getByAltText("Test Movie") as HTMLImageElement;

    expect(img.src).toContain("/images/no-image.png");
  });

  it("renders series type correctly", () => {
    const seriesMovie = { ...mockMovie, Type: "series" };
    render(<MovieCard movie={seriesMovie} />);

    expect(screen.getByTestId("smart-display-icon")).toBeInTheDocument();
    expect(screen.getByText("Series/Other")).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    render(<MovieCard movie={mockMovie} />);

    const chip = screen.getByTestId("chip");
    expect(chip).toHaveStyle("background-color: #efbf04");
    expect(chip).toHaveStyle("color: #403301");
  });
});
