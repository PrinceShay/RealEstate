// components/filters/IncrementDecrementInput.tsx

"use client";

import React from "react";

interface IncrementDecrementInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

const IncrementDecrementInput: React.FC<IncrementDecrementInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
}) => {
  const increment = () => onChange(value + 1);
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label className="mb-2 flex items-center gap-2">{label}</label>
      <div className="flex items-center border rounded  dark:bg-gray-dark dark:border-gray-light">
        <button
          type="button"
          onClick={decrement}
          className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l"
          aria-label={`Decrement ${label}`}
        >
          -
        </button>
        <input
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-16 text-center border-none focus:ring-0 bg-white dark:bg-gray-dark dark:text-gray-100"
          placeholder="0"
          min={min}
        />
        <button
          type="button"
          onClick={increment}
          className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r"
          aria-label={`Increment ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default IncrementDecrementInput;
