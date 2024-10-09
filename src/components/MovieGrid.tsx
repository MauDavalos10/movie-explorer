import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NoResults from "./NoResults";

const LazyMovieCard = React.lazy(() => import("./MovieCard"));

const MovieGrid: React.FC = () => {
  const { results, status, error } = useSelector(
    (state: RootState) => state.movies,
  );

  if (status === "loading") {
    return <div className="text-center">Loadinf</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (status === "succeeded" && results.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {results.map((movie) => (
        <Suspense
          key={movie.imdbID}
          fallback={
            <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
          }
        >
          <LazyMovieCard movie={movie} />
        </Suspense>
      ))}
    </div>
  );
};

export default MovieGrid;
