import React from "react";

const NoResults: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">
        No Results Found
      </h2>
      <p className="text-gray-500">
        We couldn't find any movies matching your search. Please try a different
        movie.
      </p>
    </div>
  );
};

export default NoResults;
