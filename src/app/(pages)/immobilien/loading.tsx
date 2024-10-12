"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="px-16 max-w-[1600px] mx-auto pb-24 pt-48">
      {/* Filter Skeleton */}
      <div className="bg-white border border-gray-light dark:border-gray-dark dark:bg-gray-darker p-4 rounded-md mb-8">
        <Skeleton className="h-6 w-32 mb-4" /> {/* Titel Skeleton */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Ort Filter Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Typ Filter Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Preis Filter Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Weitere Filter Button Skeleton */}
          <Skeleton className="h-10 w-40" />

          {/* Filter anwenden Button Skeleton */}
          <Skeleton className="h-10 w-40 ml-auto" />
        </div>
      </div>

      {/* Estate Items Skeleton */}
      <div className="w-full bg-white dark:bg-gray-darker grid grid-cols-3 gap-8 p-6 group rounded-2xl">
        <div className="flex flex-col h-full gap-3">
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
            <Skeleton className="w-full h-full" />{" "}
            {/* Placeholder für das Bild */}
          </div>
          <div className="flex gap-2 text-gray-dark dark:text-gray-light">
            <Skeleton className="w-6 h-6 rounded-full" />{" "}
            {/* Placeholder für das Herz-Icon */}
            <Skeleton className="w-6 h-6 rounded-full" />{" "}
            {/* Placeholder für das Share-Icon */}
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-start gap-2">
          <div className="flex gap-1 items-center text-gray-500 dark:text-gray-400">
            <Skeleton className="w-24 h-4" />{" "}
            {/* Placeholder für die Location */}
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="w-16 h-8 rounded-full" />{" "}
            {/* Placeholder für das 'Neu'-Badge */}
            <Skeleton className="w-48 h-6" /> {/* Placeholder für den Titel */}
          </div>
          <Skeleton className="w-full h-12 mt-4" />{" "}
          {/* Placeholder für die Beschreibung */}
          <div className="flex gap-2 text-sm mt-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="w-16 h-8 rounded-xl" />
              ))}{" "}
            {/* Placeholder für die Features */}
          </div>
          <div className="flex gap-2 mt-2">
            <Skeleton className="w-12 h-4" /> {/* Placeholder für die Fläche */}
            <Skeleton className="w-12 h-4" />{" "}
            {/* Placeholder für die Zimmeranzahl */}
          </div>
          <Skeleton className="w-24 h-6 mt-4" />{" "}
          {/* Placeholder für den Preis */}
        </div>
      </div>
    </section>
  );
}
