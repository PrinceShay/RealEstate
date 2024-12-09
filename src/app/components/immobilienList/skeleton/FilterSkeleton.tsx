"use client";

import React from "react";

// Dummy Skeleton Components for Filters
const SkeletonFilter = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-2 mb-4">
    <div className="h-4 w-1/4 bg-gray-lightest dark:bg-gray-darkest rounded"></div>
    <div className="h-10 bg-gray-lightest dark:bg-gray-dark rounded"></div>
  </div>
);

const SkeletonButton = ({ text }: { text: string }) => (
  <div className="h-10 bg-gray-light dark:bg-gray-dark rounded w-full text-center">
    {text}
  </div>
);

const EstateListFilterSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-darker border border-gray-light dark:border-gray-dark p-6 rounded-md mb-8 sm:sticky top-16 z-20 self-start animate-pulse">
      <div className="h-6 w-1/3 bg-gray-light dark:bg-gray-dark rounded mb-6"></div>
      {/* Standort-Filter */}
      <SkeletonFilter label="Standort" />

      {/* Preis-Filter */}
      <SkeletonFilter label="Preis" />

      {/* Mehr-Button für mobile Ansicht */}
      <div className="sm:hidden">
        <SkeletonButton text="Mehr Filter" />
      </div>

      {/* Zusätzliche Filter für Desktop Ansicht */}
      <div className="hidden sm:block">
        {/* Typ-Filter */}
        <SkeletonFilter label="Typ" />

        {/* Zimmer-Bereichs-Filter */}
        <SkeletonFilter label="Zimmer" />

        {/* Fläche-Bereichs-Filter */}
        <SkeletonFilter label="Fläche" />

        {/* Ausstattung Multi-Select-Filter */}
        <SkeletonFilter label="Ausstattung" />

        {/* Filter anwenden & zurücksetzen Button */}
        <div className="flex justify-end gap-2">
          <div className="h-10 bg-gray-light dark:bg-gray-dark rounded w-32"></div>
          <div className="h-10 bg-gray-darker dark:bg-gray-light rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default EstateListFilterSkeleton;
