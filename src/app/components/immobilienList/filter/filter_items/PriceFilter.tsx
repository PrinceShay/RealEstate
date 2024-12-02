// components/filters/PriceFilter.tsx

"use client";

import React from "react";
import Select, { SingleValue, StylesConfig, GroupBase } from "react-select";
import { Euro } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface PriceFilterProps {
  value: Option | null;
  onChange: (option: SingleValue<Option>) => void;
  styles: StylesConfig<Option, false>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
  styles,
}) => {
  const priceOptions: Option[] = [
    { label: "Beliebig", value: "any" },
    { label: "Bis zu 100.000€", value: "100000" },
    { label: "Bis zu 200.000€", value: "200000" },
    { label: "Bis zu 400.000€", value: "400000" },
    { label: "Bis zu 500.000€", value: "500000" },
    { label: "Bis zu 1.000.000€", value: "1000000" },
  ];

  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2">
        <Euro strokeWidth={1.5} /> Preis
      </label>
      <Select<Option, false, GroupBase<Option>>
        id="price"
        options={priceOptions}
        value={value}
        onChange={onChange}
        isClearable={false}
        placeholder="Preis auswählen"
        className="w-full"
        styles={styles}
      />
    </div>
  );
};

export default PriceFilter;
