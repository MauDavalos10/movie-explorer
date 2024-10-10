import React from "react";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setPageIndex } from "../redux/slices/pageIndexSlice";
import { searchMovies } from "../redux/slices/movieSlice";

const CustomPagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalResults } = useSelector((state: RootState) => state.movies);
  const query = useSelector((state: RootState) => state.query);
  const pageIndex = useSelector((state: RootState) => state.pageIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    dispatch(setPageIndex(newPage));
    dispatch(searchMovies({ query, pageIndex: newPage }));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(totalResults / 10)}
        page={pageIndex}
        onChange={handlePageChange}
        sx={paginationSx}
        size={"large"}
        shape={"rounded"}
      />
    </Stack>
  );
};

export default CustomPagination;

const paginationSx = {
  ".MuiButtonBase-root": {
    backgroundColor: "#efbf04",
    color: "#3b3b3b",
  },
};
