"use client";
import EstateListFilterSkeleton from "@/app/components/immobilienList/skeleton/FilterSkeleton";
import ItemSkeleton from "@/app/components/immobilienList/skeleton/ItemSkeleton";

export default function Loading() {
  return (
    <section className="px-4 max-w-[1600px] min-h-screen sm:grid grid-cols-3 gap-12 mx-auto pb-24 pt-12 md:pt-24 2xl:pt-48">
      <EstateListFilterSkeleton />

      <div className="col-span-2 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-darker h-8 w-64 animate-pulse"></div>
          <div className="bg-white dark:bg-gray-darker h-8 w-48 animate-pulse"></div>
        </div>
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
    </section>
  );
}
