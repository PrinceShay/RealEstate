import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function EstateItemLoader() {
  return (
    <div>
      <Skeleton className="aspect-video object-cover rounded-xl" />

      <div className="mt-5 flex flex-col gap-2">
        <Skeleton className="h-6" />
        <Skeleton className="h-14" />
      </div>
    </div>
  );
}

export default EstateItemLoader;
