"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import { MapPin, Home, Euro, Search } from "lucide-react";
import { client } from "@/app/lib/sanityClient";
import MobileSearch from "./MobileSearch";

type OptionType = { label: string; value: string };

// Gemeinsame Styles für Select
const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    color: "white",
    minWidth: "4em",
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

// Custom Styles für den Range-Select
const rangeStyles: StylesConfig<OptionType, false> = {
  ...customStyles,
  control: (base, state) => ({
    ...base,
    ...customStyles.control!(base, state),
    minWidth: "4em",
    width: "8em",
  }),
};

// Optionen
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

// Locations von Sanity abrufen
async function fetchLocations(): Promise<OptionType[]> {
  const query = `*[_type == "realEstate"]{
    place->{
      name,
    },
  }`;
  const locations = await client.fetch(query);

  // Doppelte Einträge entfernen
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
    const params: Record<string, string> = {};

    if (address?.value && address.value !== "any") {
      params.location = address.value;
    }

    if (range.value && range.value !== "any") {
      params.range = range.value;
    }

    if (type.value && type.value !== "any") {
      params.type = type.value;
    }

    if (price.value && price.value !== "any") {
      params.price = price.value;
    }

    const queryString = new URLSearchParams(params).toString();

    if (queryString) {
      router.push(`/immobilien?${queryString}`);
    } else {
      router.push(`/immobilien`);
    }
  };

  return (
    <div className="bg-white bg-opacity-15 max-w-[1600px] p-3 sm:p-6 text-white rounded-3xl w-full sm:w-auto flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
      {/* Ort und Reichweite */}
      <div className="hidden sm:flex items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 transition-all bg-transparent">
        <MapPin className="text-white" />
        <Select
          id="address"
          options={locationOptions}
          value={address}
          onChange={(option) => setAddress(option)}
          isClearable
          placeholder="Ort"
          className="cursor-text"
          isSearchable
          styles={customStyles}
        />
        <Select
          id="range"
          options={rangeOptions}
          value={range}
          className="hidden sm:block"
          onChange={(option) => setRange(option!)}
          isClearable={false}
          isSearchable={false}
          placeholder="Reichweite"
          styles={rangeStyles}
        />
      </div>

      {/* Immobilientyp */}
      <div className="sm:flex h-full items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 transition-all bg-transparent hidden">
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

      {/* Preisfilter */}
      <div className="hidden sm:flex h-full items-center gap-2 px-4 py-2 rounded-lg border border-white border-opacity-65 hover:border-opacity-100 bg-transparent">
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

      {/* Suchbutton */}
      <button
        className="hidden sm:flex h-full py-5 sm:py-0 bg-mintGreen-light dark:bg-mintGreen-dark dark:hover:bg-mintGreen-darkHover text-foreground px-7 rounded-lg items-center gap-2 hover:bg-mintGreen-dark transition-all ease-out"
        onClick={handleSearch}
      >
        <Search />
        Suchen
      </button>

      {/* Mobile Suche */}
      <MobileSearch />
    </div>
  );
}
