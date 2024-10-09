import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPageIndex } from "../redux/slices/pageIndexSlice";
import { searchMovies } from "../redux/slices/movieSlice";
import NoResults from "./NoResults";
import { Pagination, Stack } from "@mui/material";

const LazyMovieCard = React.lazy(() => import("./MovieCard"));

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, status, error, totalResults } = useSelector(
    (state: RootState) => state.movies,
  );
  const query = useSelector((state: RootState) => state.query);
  const pageIndex = useSelector((state: RootState) => state.pageIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    dispatch(setPageIndex(newPage));
    dispatch(searchMovies({ query, pageIndex: newPage }));
  };

  if (status === "loading") {
    return <div className="text-center">Loading</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (status === "not-found") {
    return <NoResults />;
  }

  return (
    <>
      <Suspense fallback={<div>Loading movies...</div>}>
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
      </Suspense>

      {results.length > 0 && (
        <div className="flex justify-center mt-4">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalResults / 10)}
              page={pageIndex}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      )}
    </>
  );
};

export default MovieGrid;
