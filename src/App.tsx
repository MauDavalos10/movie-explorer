import React, { Suspense, lazy } from "react";
import SearchInput from "./components/SearchInput";

const LazyMovieGrid = lazy(() => import("./components/MovieGrid"));

function App() {
  return (
    <div className="h-screen p-4">
      <SearchInput />
      <Suspense fallback={<div className="text-center">GKHFAKHFAGKHF...</div>}>
        <LazyMovieGrid />
      </Suspense>
    </div>
  );
}

export default App;
