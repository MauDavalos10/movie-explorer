import React from "react";
import { Movie } from "../redux/slices/movieSlice";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl relative">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "./images/no-image.png"}
          alt={movie.Title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium text-white text-sm">{movie.Year}</p>
          <Chip
            avatar={
              movie.Type === "movie" ? (
                <LocalMoviesIcon
                  style={{ color: "#403301" }}
                  fontSize="small"
                />
              ) : (
                <SmartDisplayIcon
                  style={{ color: "#403301" }}
                  fontSize="small"
                />
              )
            }
            size="small"
            label={movie.Type === "movie" ? "Movie" : "Series/Other"}
            variant="outlined"
            style={{ backgroundColor: "#efbf04", color: "#403301" }}
            className="bg-white/20 backdrop-blur-sm"
          />
        </div>
        <h2 className="text-xl font-bold leading-tight text-white mb-2">
          {movie.Title}
        </h2>
      </div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
        <StarIcon className="text-yellow-400" />
      </div>
    </div>
  );
};

export default MovieCard;
