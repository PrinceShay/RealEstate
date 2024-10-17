"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import { MapPin, Home, Euro, Search } from "lucide-react";
import { client } from "@/app/lib/sanityClient";

type OptionType = { label: string; value: string };

// Shared styles for the Select components
const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    color: "white",
    minWidth: "6em",
    width: "12em",
  }),
  input: (base) => ({
    ...base,
    color: "white",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    color: "black",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#333333" : "transparent",
    color: state.isFocused ? "white" : "black",
  }),
};

// Custom styles for the range Select to make it less wide
const rangeStyles: StylesConfig<OptionType, false> = {
  ...customStyles,
  control: (base, state) => ({
    ...base,
    ...customStyles.control!(base, state),
    minWidth: "4em",
    width: "8em",
  }),
};

// Options for Select components
const rangeOptions: OptionType[] = [
  { label: "Beliebig", value: "any" },
  { label: "0 km", value: "0" },
  { label: "30 km", value: "30" },
  { label: "50 km", value: "50" },
  { label: "100 km", value: "100" },
  { label: "250 km", value: "250" },
];

const typeOptions: OptionType[] = [
  { label: "Beliebig", value: "any" },
  { label: "Haus kaufen", value: "Buy house" },
  { label: "Wohnung kaufen", value: "Buy apartment" },
  { label: "Wohnung mieten", value: "Rent apartment" },
  { label: "Land kaufen", value: "Buy land" },
];

const priceOptions: OptionType[] = [
  { label: "Beliebig", value: "any" },
  { label: "Bis zu 100,000€", value: "100000" },
  { label: "Bis zu 200,000€", value: "200000" },
  { label: "Bis zu 400,000€", value: "400000" },
  { label: "Bis zu 500,000€", value: "500000" },
  { label: "Bis zu 1,000,000€", value: "1000000" },
];

// Function to fetch locations from Sanity
async function fetchLocations(): Promise<OptionType[]> {
  const query = `*[_type == "realEstate"]{
    place->{
      name, 
    },
  }`;
  const locations = await client.fetch(query);
  // Filter to remove duplicate places
  const uniqueLocations = locations.filter(
    (location: { place: { name: string } }, index: number, self: any[]) =>
      index === self.findIndex((loc) => loc.place.name === location.place.name)
  );

  return uniqueLocations.map((location: { place: { name: string } }) => ({
    label: location.place.name,
    value: location.place.name,
  }));
}

export default function HeroSearch() {
  const [address, setAddress] = useState<OptionType | null>(null);
  const [range, setRange] = useState<OptionType>(rangeOptions[0]);
  const [type, setType] = useState<OptionType>(typeOptions[0]);
  const [price, setPrice] = useState<OptionType>(priceOptions[0]);
  const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getLocationOptions() {
      const data = await fetchLocations();
      setLocationOptions(data);
    }
    getLocationOptions();
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams({
      location: address?.value || "",
      range: range?.value || "any",
      type: type?.value || "any",
      price: price?.value || "any",
    });
    router.push(`/immobilien?${query.toString()}`);
  };

  return (
    <div className="bg-white bg-opacity-15 max-w-[1600px] p-6 text-white rounded-3xl flex items-center justify-between gap-6 backdrop-blur-md">
      {/* Location and Range */}
      <div className="flex items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 transition-all bg-transparent">
        <MapPin className="text-white" />
        <Select
          id="address"
          options={locationOptions}
          value={address}
          onChange={(option) => setAddress(option)}
          isClearable
          placeholder="Ort"
          isSearchable
          styles={customStyles}
        />
        <Select
          id="range"
          options={rangeOptions}
          value={range}
          onChange={(option) => setRange(option!)}
          isClearable={false}
          isSearchable={false}
          placeholder="Reichweite"
          styles={rangeStyles} // Apply the custom range styles here
        />
      </div>

      {/* Property Type */}
      <div className="flex h-full items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 transition-all bg-transparent">
        <Home className="text-white" />
        <Select
          id="type"
          options={typeOptions}
          value={type}
          onChange={(option) => setType(option!)}
          isClearable={false}
          isSearchable={false}
          placeholder="Art"
          styles={customStyles}
        />
      </div>

      {/* Price Filter */}
      <div className="flex h-full items-center gap-2 px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 bg-transparent">
        <Euro className="text-white" />
        <Select
          id="price"
          options={priceOptions}
          value={price}
          onChange={(option) => setPrice(option!)}
          isClearable={false}
          isSearchable={false}
          placeholder="Preis"
          styles={customStyles}
        />
      </div>

      {/* Search Button */}
      <button
        className="h-full bg-mintGreen-light dark:bg-mintGreen-dark dark:hover:bg-mintGreen-darkHover text-foreground px-7 rounded-lg flex items-center gap-2 hover:bg-mintGreen-dark transition-all ease-out"
        onClick={handleSearch}
      >
        <Search />
        Ergebnisse anzeigen
      </button>
    </div>
  );
}
