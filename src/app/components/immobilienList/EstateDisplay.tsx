"use client";

import { useState } from "react";
import EstateItem from "@/app/components/index/recommendedObjects/EstateItem";
import EstateItemList from "@/app/components/immobilienList/Item/EstateItemList";
import { Switch } from "@/components/ui/switch";

interface EstateDisplayProps {
  estates: any[];
}

export default function EstateDisplay({ estates }: EstateDisplayProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  return (
    <div className="col-span-2">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Switch onCheckedChange={toggleViewMode} />
          <label>
            {viewMode === "list"
              ? "Zur Kartenansicht wechseln"
              : "Zur Listenansicht wechseln"}
          </label>
        </div>

        <p>
          {estates.length === 1
            ? "Ein Objekt gefunden"
            : `${estates.length} Objekte gefunden`}
        </p>
      </div>

      {viewMode === "list" ? (
        <div className="flex flex-col gap-4">
          {estates.map((estate) => (
            <EstateItemList key={estate.slug} estate={estate} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {estates.map((estate) => (
            <EstateItem key={estate.slug} estate={estate} />
          ))}
        </div>
      )}
    </div>
  );
}
