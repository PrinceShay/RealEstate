import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EstateHeroLoader() {
  return (
    <header>
      {/* Bild-Skeleton */}
      <div className="w-full aspect-video rounded-2xl relative overflow-clip flex flex-col justify-end items-start p-6">
        <Skeleton className="w-full h-full absolute object-cover" />
        <div className="relative flex items-center gap-2 bg-gray-lightest dark:text-gray-lightest dark:bg-gray-darker p-5 rounded-xl">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>

      {/* Titel und Details Skeleton */}
      <div className="my-6">
        <Skeleton className="h-10 w-2/3 mb-4" />
        <div className="flex gap-12 mt-4 border-b pb-8 border-gray-dark dark:border-gray-light">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
