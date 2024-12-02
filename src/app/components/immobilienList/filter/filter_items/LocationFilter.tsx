// components/filters/LocationFilter.tsx

"use client";

import React from "react";
import Select, { SingleValue, StylesConfig, GroupBase } from "react-select";
import { MapPin } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface LocationFilterProps {
  value: Option | null;
  onChange: (option: SingleValue<Option>) => void;
  options: Option[];
  styles: StylesConfig<Option, false>;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  value,
  onChange,
  options,
  styles,
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2">
        <MapPin strokeWidth={1.5} /> Ort
      </label>
      <Select<Option, false, GroupBase<Option>>
        id="location"
        options={options}
        value={value}
        onChange={onChange}
        isClearable
        placeholder="Ort auswählen"
        className="w-full"
        styles={styles}
      />
    </div>
  );
};

export default LocationFilter;
