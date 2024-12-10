// components/filters/AreaFilter.tsx

"use client";

import React from "react";
import { Maximize2 } from "lucide-react";
import IncrementDecrementInput from "./IncrementDecrementInput";

interface AreaFilterProps {
  areaFrom: number;
  areaTo: number;
  setAreaFrom: (value: number) => void;
  setAreaTo: (value: number) => void;
}

const AreaFilter: React.FC<AreaFilterProps> = ({
  areaFrom,
  areaTo,
  setAreaFrom,
  setAreaTo,
}) => {
  return (
    <div className="mb-6 ">
      <label className="mb-2 flex items-center gap-2">
        <Maximize2 strokeWidth={1.5} /> Fläche (m²)
      </label>
      <div className="flex items-center gap-4">
        {/* Von */}
        <IncrementDecrementInput
          label="Von"
          value={areaFrom}
          onChange={setAreaFrom}
          min={0}
        />

        <span className="hidden sm:block mx-2">–</span>

        {/* Bis */}
        <IncrementDecrementInput
          label="Bis"
          value={areaTo}
          onChange={setAreaTo}
          min={0}
        />
      </div>
    </div>
  );
};

export default AreaFilter;
