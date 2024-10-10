import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPageIndex } from "../redux/slices/pageIndexSlice";
import { searchMovies } from "../redux/slices/movieSlice";
import { Pagination, Stack } from "@mui/material";
import CustomSpinner from "./CustomSpinner";

const LazyMovieCard = React.lazy(() => import("./MovieCard"));
const LazyNoResults = React.lazy(() => import("./NoResults"));

const MovieGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, status, error, totalResults } = useSelector(
    (state: RootState) => state.movies,
  );
  const query = useSelector((state: RootState) => state.query);
  const pageIndex = useSelector((state: RootState) => state.pageIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    dispatch(setPageIndex(newPage));
    dispatch(searchMovies({ query, pageIndex: newPage }));
  };

  if (status === "loading") {
    return <CustomSpinner />;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (status === "not-found") {
    return (
      <Suspense fallback={<CustomSpinner />}>
        <LazyNoResults />
      </Suspense>
    );
  }

  const SkeletonMovieCards = () => (
    <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="w-[300px] bg-neutral-500 animate-pulse rounded-xl shadow-md overflow-hidden hover:border-neutral-500 hover:scale-105 border cursor-pointer transition-all duration-300"
        >
          <div className="w-full h-[400px]"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Suspense fallback={<SkeletonMovieCards />}>
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((movie) => (
            <LazyMovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </Suspense>

      {results.length > 0 && (
        <div className="flex justify-center pt-10">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalResults / 10)}
              page={pageIndex}
              onChange={handlePageChange}
              sx={{ color: "#efbf04" }}
              size={"large"}
            />
          </Stack>
        </div>
      )}
    </>
  );
};

export default MovieGrid;
