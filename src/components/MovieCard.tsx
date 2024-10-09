import React from "react";
import { Movie } from "../redux/slices/movieSlice";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Chip } from "@mui/material";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="max-w-[300px] bg-white rounded-xl shadow-md overflow-hidden hover:border-neutral-500 hover:scale-105 border cursor-pointer transition-all duration-300">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "./images/no-image.png"}
          alt={movie.Title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-neutral-500 text-sm">{movie.Year}</p>
          <Chip
            avatar={
              movie.Type === "movie" ? (
                <LocalMoviesIcon fontSize={"small"} />
              ) : (
                <LiveTvIcon fontSize={"small"} />
              )
            }
            size={"small"}
            label={movie.Type === "movie" ? "Movie" : "Series/Other"}
            variant="outlined"
          />
        </div>
        <h2 className="text-xl font-bold leading-tight ">{movie.Title}</h2>
      </div>
    </div>
  );
};

export default MovieCard;
