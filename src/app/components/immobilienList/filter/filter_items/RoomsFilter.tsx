// components/filters/RoomsFilter.tsx

"use client";

import React from "react";
import { DoorOpen } from "lucide-react";
import IncrementDecrementInput from "./IncrementDecrementInput";

interface RoomsFilterProps {
  roomsFrom: number;
  roomsTo: number;
  setRoomsFrom: (value: number) => void;
  setRoomsTo: (value: number) => void;
}

const RoomsFilter: React.FC<RoomsFilterProps> = ({
  roomsFrom,
  roomsTo,
  setRoomsFrom,
  setRoomsTo,
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2">
        <DoorOpen strokeWidth={1.5} /> Zimmer
      </label>
      <div className="flex items-center gap-4">
        {/* Von */}
        <IncrementDecrementInput
          label="Von"
          value={roomsFrom}
          onChange={setRoomsFrom}
          min={0}
        />

        <span className="hidden sm:block mx-2">–</span>

        {/* Bis */}
        <IncrementDecrementInput
          label="Bis"
          value={roomsTo}
          onChange={setRoomsTo}
          min={0}
        />
      </div>
    </div>
  );
};

export default RoomsFilter;
