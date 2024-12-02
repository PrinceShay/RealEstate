// components/filters/TypeFilter.tsx

"use client";

import React from "react";
import Select, { SingleValue, StylesConfig, GroupBase } from "react-select";
import { Home } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface TypeFilterProps {
  value: Option | null;
  onChange: (option: SingleValue<Option>) => void;
  styles: StylesConfig<Option, false>;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange, styles }) => {
  const typeOptions: Option[] = [
    { label: "Beliebig", value: "any" },
    { label: "Haus kaufen", value: "buy house" },
    { label: "Wohnung kaufen", value: "buy apartment" },
    { label: "Wohnung mieten", value: "rent apartment" },
    { label: "Land kaufen", value: "buy land" },
  ];

  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2">
        <Home strokeWidth={1.5} /> Typ
      </label>
      <Select<Option, false, GroupBase<Option>>
        id="type"
        options={typeOptions}
        value={value}
        onChange={onChange}
        isClearable={false}
        placeholder="Typ auswählen"
        className="w-full"
        styles={styles}
      />
    </div>
  );
};

export default TypeFilter;
