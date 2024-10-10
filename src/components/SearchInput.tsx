import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setQuery } from "../redux/slices/querySlice";
import { searchMovies } from "../redux/slices/movieSlice";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputQuery, setInputQuery] = useState("");

  const handleSearch = () => {
    dispatch(setQuery(inputQuery));
    dispatch(searchMovies({ query: inputQuery, pageIndex: 1 }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded-md"
        placeholder="Search for a movie..."
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-[#636363] text-white py-2 px-4 rounded hover:bg-[#3b3b3b] transition-colors"
        onClick={handleSearch}
        style={{ color: "#efbf04" }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
