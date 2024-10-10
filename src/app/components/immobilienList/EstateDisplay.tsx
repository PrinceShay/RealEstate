"use client";

import { useState } from "react";
import EstateItem from "@/app/components/index/recommendedObjects/EstateItem";
import EstateItemList from "@/app/components/immobilienList/EstateItemList";
import { Switch } from "@/components/ui/switch";

export default function EstateDisplay({ estates }: { estates: any }) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <Switch onCheckedChange={toggleViewMode} />
          <label>
            {viewMode === "list"
              ? "Switch to Grid View"
              : "Switch to List View"}
          </label>
        </div>

        {estates.length > 1 ? (
          <p>{estates.length} Objekte gefunden</p>
        ) : (
          <p>Ein Objekt gefunden</p>
        )}
      </div>

      {viewMode === "list" ? (
        <div className="flex flex-col gap-4">
          {estates.map((estate: any) => (
            <EstateItemList key={estate.slug} estate={estate} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {estates.map((estate: any) => (
            <EstateItem key={estate.slug} estate={estate} />
          ))}
        </div>
      )}
    </div>
  );
}
