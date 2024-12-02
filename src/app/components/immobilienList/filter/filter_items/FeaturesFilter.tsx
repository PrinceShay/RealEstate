// components/filters/FeaturesFilter.tsx

"use client";

import React from "react";
import Select, { MultiValue, StylesConfig, GroupBase } from "react-select";
import { Layers } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface FeaturesFilterProps {
  selectedFeatures: MultiValue<Option>;
  onChange: (options: MultiValue<Option>) => void;
  options: Option[];
  styles: StylesConfig<Option, true>;
}

const FeaturesFilter: React.FC<FeaturesFilterProps> = ({
  selectedFeatures,
  onChange,
  options,
  styles,
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2">
        <Layers strokeWidth={1.5} /> Ausstattung
      </label>
      <Select<Option, true, GroupBase<Option>>
        options={options}
        value={selectedFeatures}
        onChange={onChange}
        isMulti
        placeholder="Ausstattung auswählen"
        className="w-full"
        styles={styles}
      />
    </div>
  );
};

export default FeaturesFilter;
