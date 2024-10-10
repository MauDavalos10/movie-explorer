import React, { Suspense, lazy } from "react";
import SearchInput from "./components/SearchInput";
import Header from "./components/Header";
import CustomSpinner from "./components/CustomSpinner";

const LazyMovieGrid = lazy(() => import("./components/MovieGrid"));

function App() {
  return (
    <>
      <Header />
      <div className="h-screen p-4 bg-[#d9d9d9] overflow-scroll">
        <SearchInput />
        <Suspense fallback={<CustomSpinner />}>
          <LazyMovieGrid />
        </Suspense>
      </div>
    </>
  );
}

export default App;
