"use client";

import React from "react";

export default function EstateHeroSkeleton() {
  return (
    <header className=" ">
      {/* Image Placeholder */}
      <div className="w-full sm:aspect-video aspect-[4/5] rounded-2xl relative overflow-clip flex flex-col justify-end items-start  animate-pulse bg-gray-light dark:bg-gray-darker">
        <div className="w-full h-full absolute object-cover bg-gray-lighter dark:bg-gray-dark"></div>
      </div>

      {/* Details Placeholder */}
      <div className="my-6 space-y-4">
        {/* Titel */}
        <h1 className="text-3xl bg-gray-lighter dark:bg-gray-dark rounded w-3/4 h-8 animate-pulse"></h1>

        {/* Property Details */}
        <div className="flex gap-12 w-full overflow-auto mt-8 border-b pb-8 border-gray-dark dark:border-gray-darker space-x-4">
          {/* Kaufpreis */}
          <div className="flex flex-col gap-1">
            <div className="h-6 bg-gray-lighter dark:bg-gray-dark rounded w-24 animate-pulse"></div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Kaufpreis
            </div>
          </div>
          {/* Zimmer */}
          <div className="flex flex-col gap-1">
            <div className="h-6 bg-gray-lighter dark:bg-gray-dark rounded w-16 animate-pulse"></div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Zimmer
            </div>
          </div>
          {/* Wohnfläche */}
          <div className="flex flex-col gap-1">
            <div className="h-6 bg-gray-lighter dark:bg-gray-dark rounded w-20 animate-pulse"></div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Wohnfläche
            </div>
          </div>
          {/* Grundstück */}
          <div className="flex flex-col gap-1">
            <div className="h-6 bg-gray-lighter dark:bg-gray-dark rounded w-20 animate-pulse"></div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Grundstück
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
