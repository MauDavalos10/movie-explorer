import React from "react";
import SearchInput from "./components/SearchInput";
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";

function App() {
  return (
    <>
      <Header />
      <div className="h-screen p-4 bg-[#d9d9d9] overflow-scroll">
        <SearchInput />
        <MovieGrid />
      </div>
    </>
  );
}

export default App;
