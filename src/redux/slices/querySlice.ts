import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
  name: "query",
  initialState: "",
  reducers: {
    setQuery: (state, action) => action.payload,
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
