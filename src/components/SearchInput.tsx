import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setQuery } from "../redux/slices/querySlice";
import { searchMovies } from "../redux/slices/movieSlice";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pageIndex = useSelector((state: RootState) => state.pageIndex);
  const [inputQuery, setInputQuery] = useState("");

  const handleSearch = () => {
    dispatch(setQuery(inputQuery));
    dispatch(searchMovies({ query: inputQuery, pageIndex }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded-md"
        placeholder="Search for a movie..."
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
      />
      <button
        className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
