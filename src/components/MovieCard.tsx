import React from "react";
import { Movie } from "../redux/slices/movieSlice";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LiveTvIcon from "@mui/icons-material/LiveTv";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:border-neutral-500 hover:scale-110 border cursor-pointer transition-transform transition-border duration-500">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "./images/no-image.png"}
        alt={movie.Title}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="flex flex-col gap-1 p-4">
        <h2 className="font-medium font-inter text-neutral-500 text-[16px]">
          {movie.Year}
        </h2>
        <h2 className="text-[20px] font-bold leading-tight">{movie.Title}</h2>
        {movie.Type === "movie" ? (
          <div className="flex items-center gap-1">
            <LocalMoviesIcon />
            <h2 className="text-sm text-neutral-700">Movie</h2>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <LiveTvIcon />
            <h2 className="text-sm text-neutral-700">Series/Other</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
