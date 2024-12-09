import React from "react";

export default function ItemSkeleton() {
  return (
    <div className="w-full  bg-white dark:bg-gray-darker gap-8 p-6 rounded-2xl animate-pulse">
      <div className="flex flex-col mb-8 gap-3">
        <div className="aspect-video bg-gray-lightest dark:bg-gray-dark rounded-xl w-full"></div>
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-lighter dark:bg-gray-dark rounded-full"></div>
          <div className="h-6 w-6 bg-gray-lighter dark:bg-gray-dark rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-1/4 bg-gray-lighter dark:bg-gray-dark rounded"></div>
        <div className="h-6 w-3/4 bg-gray-lighter dark:bg-gray-dark rounded"></div>
        <div className="h-4 w-full bg-gray-lighter dark:bg-gray-dark rounded mt-4"></div>
        <div className="flex gap-2 mt-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="h-6 w-16 bg-gray-lighter dark:bg-gray-dark rounded-xl"
              ></div>
            ))}
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-16 bg-gray-lighter dark:bg-gray-dark rounded"></div>
          <div className="h-6 w-24 bg-gray-lighter dark:bg-gray-dark rounded"></div>
        </div>
        <div className="h-8 w-1/3 bg-gray-lighter dark:bg-gray-dark rounded mt-4"></div>
      </div>
    </div>
  );
}
