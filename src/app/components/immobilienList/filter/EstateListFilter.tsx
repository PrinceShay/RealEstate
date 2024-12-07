// components/EstateListFilter.tsx

"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/app/lib/sanityClient";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersVertical } from "lucide-react"; // Icons

// Import shadcn Button and Sheet components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PriceFilter from "./filter_items/PriceFilter";
import TypeFilter from "./filter_items/TypeFilter";
import RoomsFilter from "./filter_items/RoomsFilter";
import LocationFilter from "./filter_items/LocationFilter";
import AreaFilter from "./filter_items/AreaFilter";
import FeaturesFilter from "./filter_items/FeaturesFilter";
import { MultiValue, StylesConfig } from "react-select";

// Define a common type for options
type Option = {
  label: string;
  value: string;
};

// Functions to fetch data from Sanity
async function getFeatures(): Promise<Option[]> {
  const query = `*[_type == "estateFeatures"] { name }`;
  const features = await client.fetch(query);

  return features.map((feature: { name: string }) => ({
    label: feature.name,
    value: feature.name,
  }));
}

async function getLocations(): Promise<Option[]> {
  const query = `*[_type == "realEstate"]{ place->{ name } }`;
  const locations = await client.fetch(query);
  // Remove duplicate location names
  const uniqueLocations = locations.filter(
    (location: { place: { name: string } }, index: number, self: any[]) =>
      index === self.findIndex((loc) => loc.place.name === location.place.name)
  );

  return uniqueLocations.map((location: { place: { name: string } }) => ({
    label: location.place.name,
    value: location.place.name,
  }));
}

const EstateListFilter: React.FC = () => {
  // State to track Dark Mode
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Function to check Dark Mode status
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Observe changes to the <html> class list
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Color constants based on Dark Mode
  const PRIMARY_COLOR = "#85C7AE"; // Example color
  const BG_COLOR = isDark ? "#212B30" : "white"; // Dark background for Dark Mode
  const FG_COLOR = isDark ? "white" : "#101419"; // Light foreground for Dark Mode

  // Dynamic custom styles for react-select
  const customSelectStyles: StylesConfig<Option, boolean> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: BG_COLOR,
      color: FG_COLOR,
      borderColor: state.isFocused ? PRIMARY_COLOR : "#4b5563",
      "&:hover": {
        borderColor: PRIMARY_COLOR,
      },
      boxShadow: state.isFocused ? `0 0 0 1px ${PRIMARY_COLOR}` : "none",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: BG_COLOR,
      color: FG_COLOR,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? PRIMARY_COLOR
        : state.isSelected
          ? PRIMARY_COLOR
          : "transparent",
      color: state.isFocused || state.isSelected ? "#101419" : FG_COLOR,
      "&:active": {
        backgroundColor: PRIMARY_COLOR,
        color: FG_COLOR,
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: FG_COLOR,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: PRIMARY_COLOR,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#101419",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#101419",
      "&:hover": {
        backgroundColor: PRIMARY_COLOR,
        color: "#DAE0E7",
      },
    }),
  };

  // Main filter states
  const [location, setLocation] = useState<Option | null>(null);
  const [price, setPrice] = useState<Option | null>(null);

  // Additional filter states
  const [type, setType] = useState<Option | null>(null);
  const [roomsFrom, setRoomsFrom] = useState<number>(0);
  const [roomsTo, setRoomsTo] = useState<number>(0);
  const [areaFrom, setAreaFrom] = useState<number>(0);
  const [areaTo, setAreaTo] = useState<number>(0);
  const [selectedFeatures, setSelectedFeatures] = useState<MultiValue<Option>>(
    []
  );
  const [featureOptions, setFeatureOptions] = useState<Option[]>([]);

  // Options states
  const [locationOptions, setLocationOptions] = useState<Option[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fetch features and locations from Sanity
    async function fetchData() {
      const [featuresData, locationsData] = await Promise.all([
        getFeatures(),
        getLocations(),
      ]);
      setFeatureOptions(featuresData);
      setLocationOptions(locationsData);
    }
    fetchData();
  }, []);

  // Handle filter application
  const handleFilter = () => {
    const query = new URLSearchParams();

    if (location?.value) query.set("location", location.value);
    if (type?.value) query.set("type", type.value);
    if (price?.value && price.value !== "any")
      query.set("priceTo", price.value);
    if (roomsFrom > 0) query.set("roomsFrom", roomsFrom.toString());
    if (roomsTo > 0) query.set("roomsTo", roomsTo.toString());
    if (areaFrom > 0) query.set("areaFrom", areaFrom.toString());
    if (areaTo > 0) query.set("areaTo", areaTo.toString());
    if (selectedFeatures.length > 0) {
      query.set("features", selectedFeatures.map((f) => f.value).join(","));
    }

    // Navigate to the same page with updated query parameters
    router.push(`/immobilien?${query.toString()}`);
  };

  // Handle filter reset
  const resetFilters = () => {
    // Set all filter states to their default values
    setLocation(null);
    setPrice(null);
    setType(null);
    setRoomsFrom(0);
    setRoomsTo(0);
    setAreaFrom(0);
    setAreaTo(0);
    setSelectedFeatures([]);

    // Remove all query parameters from the URL
    router.push(`/immobilien`);
  };

  // Initialize filters from URL query parameters
  useEffect(() => {
    const loc = searchParams.get("location");
    if (loc) {
      setLocation({ label: loc, value: loc });
    } else {
      setLocation(null);
    }

    const t = searchParams.get("type");
    if (t) {
      setType({ label: t, value: t });
    } else {
      setType(null);
    }

    const p = searchParams.get("priceTo");
    if (p) {
      const priceOption = {
        label: `Bis zu ${p}€`,
        value: p,
      };
      setPrice(priceOption);
    } else {
      setPrice(null);
    }

    // Handle roomsFrom and roomsTo
    const roomsF = searchParams.get("roomsFrom");
    setRoomsFrom(roomsF ? parseInt(roomsF) : 0);

    const roomsT = searchParams.get("roomsTo");
    setRoomsTo(roomsT ? parseInt(roomsT) : 0);

    // Handle areaFrom and areaTo
    const areaF = searchParams.get("areaFrom");
    setAreaFrom(areaF ? parseInt(areaF) : 0);

    const areaT = searchParams.get("areaTo");
    setAreaTo(areaT ? parseInt(areaT) : 0);

    // Handle features
    const features = searchParams.get("features");
    if (features) {
      const featuresArray = features.split(",").map((feature) => ({
        label: feature,
        value: feature,
      }));
      setSelectedFeatures(featuresArray);
    } else {
      setSelectedFeatures([]);
    }
  }, [searchParams]);

  return (
    <div className="bg-white border border-gray-light dark:border-gray-dark dark:bg-gray-darker p-6 rounded-md mb-8 sm:sticky top-16 2xl:top-36 z-20 self-start overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">Filter</h2>

      {/* Standort-Filter */}
      <LocationFilter
        value={location}
        onChange={setLocation}
        options={locationOptions}
        styles={customSelectStyles}
      />

      {/* Preis-Filter */}
      <PriceFilter
        value={price}
        onChange={setPrice}
        styles={customSelectStyles}
      />

      {/* Mehr-Button für mobile Ansicht */}
      <div className="mb-6 sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              className="w-full flex items-center justify-center"
            >
              <SlidersVertical className="mr-2" /> Mehr Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80">
            <SheetHeader>
              <SheetTitle>Weitere Filter</SheetTitle>
            </SheetHeader>
            {/* Typ-Filter */}
            <TypeFilter
              value={type}
              onChange={setType}
              styles={customSelectStyles}
            />

            {/* Zimmer-Bereichs-Filter */}
            <RoomsFilter
              roomsFrom={roomsFrom}
              roomsTo={roomsTo}
              setRoomsFrom={setRoomsFrom}
              setRoomsTo={setRoomsTo}
            />

            {/* Fläche-Bereichs-Filter */}
            <AreaFilter
              areaFrom={areaFrom}
              areaTo={areaTo}
              setAreaFrom={setAreaFrom}
              setAreaTo={setAreaTo}
            />

            {/* Ausstattung Multi-Select-Filter */}
            <FeaturesFilter
              selectedFeatures={selectedFeatures}
              onChange={setSelectedFeatures}
              options={featureOptions}
              styles={customSelectStyles}
            />

            {/* Filter anwenden Button */}
            <div className="flex justify-end">
              <Button onClick={handleFilter} className="w-full sm:w-auto">
                Filter anwenden
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Zusätzliche Filter für Desktop Ansicht */}
      <div className="hidden sm:block">
        {/* Typ-Filter */}
        <TypeFilter
          value={type}
          onChange={setType}
          styles={customSelectStyles}
        />

        {/* Zimmer-Bereichs-Filter */}
        <RoomsFilter
          roomsFrom={roomsFrom}
          roomsTo={roomsTo}
          setRoomsFrom={setRoomsFrom}
          setRoomsTo={setRoomsTo}
        />

        {/* Fläche-Bereichs-Filter */}
        <AreaFilter
          areaFrom={areaFrom}
          areaTo={areaTo}
          setAreaFrom={setAreaFrom}
          setAreaTo={setAreaTo}
        />

        {/* Ausstattung Multi-Select-Filter */}
        <FeaturesFilter
          selectedFeatures={selectedFeatures}
          onChange={setSelectedFeatures}
          options={featureOptions}
          styles={customSelectStyles}
        />

        {/* Filter anwenden & zurücksetzen Button */}
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={resetFilters}
          >
            Filter zurücksetzen
          </Button>
          <Button onClick={handleFilter} className="w-full sm:w-auto">
            Filter anwenden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstateListFilter;
