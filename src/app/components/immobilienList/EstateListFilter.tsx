"use client";

import React, { useState, useEffect } from "react";
import Select, {
  MultiValue,
  SingleValue,
  StylesConfig,
  GroupBase,
} from "react-select";
import { client } from "@/app/lib/sanityClient";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Home, Euro, Layers, DoorOpen, Maximize2 } from "lucide-react"; // Icons

// Import shadcn Button component
import { Button } from "@/components/ui/button";

// Definiere einen gemeinsamen Typ für Optionen
type Option = {
  label: string;
  value: string;
};

// Funktion zum Abrufen von Features aus Sanity
async function getFeatures(): Promise<Option[]> {
  const query = `*[_type == "estateFeatures"] {
    name
  }`;
  const features = await client.fetch(query);

  return features.map((feature: { name: string }) => ({
    label: feature.name,
    value: feature.name,
  }));
}

// Funktion zum Abrufen von Standortoptionen
async function getLocations(): Promise<Option[]> {
  const query = `*[_type == "realEstate"]{
    place->{
      name, 
    },
  }`;
  const locations = await client.fetch(query);
  // Entferne doppelte Ortsnamen
  const uniqueLocations = locations.filter(
    (location: { place: { name: string } }, index: number, self: any[]) =>
      index === self.findIndex((loc) => loc.place.name === location.place.name)
  );

  return uniqueLocations.map((location: { place: { name: string } }) => ({
    label: location.place.name,
    value: location.place.name,
  }));
}

// Custom styles for react-select to support dark mode with updated color
const PRIMARY_COLOR = "#85C7AE";

const customSelectStyles: StylesConfig<Option, boolean> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor:
      "var(--tw-bg-opacity, 1) rgb(31 41 55 / var(--tw-bg-opacity))", // dark:bg-gray-darker equivalent
    color: "white",
    borderColor: state.isFocused ? PRIMARY_COLOR : "#4b5563", // Updated border color on focus
    "&:hover": {
      borderColor: PRIMARY_COLOR,
    },
    boxShadow: state.isFocused ? `0 0 0 1px ${PRIMARY_COLOR}` : "none", // Updated box shadow on focus
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgb(31 41 55)", // dark:bg-gray-darker equivalent
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? PRIMARY_COLOR // Updated background color on focus
      : state.isSelected
        ? PRIMARY_COLOR // Updated background color on selection
        : "transparent",
    color: state.isFocused || state.isSelected ? "white" : "gray",
    "&:active": {
      backgroundColor: PRIMARY_COLOR, // Updated active background color
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: PRIMARY_COLOR, // Updated multi-value background color
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: PRIMARY_COLOR,
      // Updated multi-value remove hover background color
      color: "white",
    },
  }),
};

export default function EstateListFilter() {
  // Hauptfilter-Zustände
  const [location, setLocation] = useState<Option | null>(null);
  const [type, setType] = useState<Option | null>({
    label: "Beliebig",
    value: "any",
  });
  const [price, setPrice] = useState<Option | null>({
    label: "Beliebig",
    value: "any",
  });

  // Zusätzliche Filter-Zustände
  const [roomsFrom, setRoomsFrom] = useState<number>(0);
  const [roomsTo, setRoomsTo] = useState<number>(0);
  const [areaFrom, setAreaFrom] = useState<number>(0);
  const [areaTo, setAreaTo] = useState<number>(0);
  const [selectedFeatures, setSelectedFeatures] = useState<MultiValue<Option>>(
    []
  );
  const [featureOptions, setFeatureOptions] = useState<Option[]>([]);

  // Optionen-Zustände
  const [locationOptions, setLocationOptions] = useState<Option[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Abrufen von Features und Standorten aus Sanity
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

  // Funktion zur Handhabung der Filteranwendung
  const handleFilter = () => {
    const query = new URLSearchParams({
      location: location?.value || "",
      type: type?.value || "any",
      price: price?.value || "any",
      roomsFrom: roomsFrom > 0 ? roomsFrom.toString() : "",
      roomsTo: roomsTo > 0 ? roomsTo.toString() : "",
      areaFrom: areaFrom > 0 ? areaFrom.toString() : "",
      areaTo: areaTo > 0 ? areaTo.toString() : "",
      features: selectedFeatures.map((f) => f.value).join(",") || "",
    });

    // Navigiere zur gleichen Seite mit aktualisierten Query-Parametern
    router.push(`/immobilien?${query.toString()}`);
  };

  // Initialisiere Filter aus URL-Query-Parametern
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const loc = params.get("location");
    if (loc) {
      setLocation({ label: loc, value: loc });
    }

    const t = params.get("type") || "any";
    setType({ label: t, value: t });

    const p = params.get("price") || "any";
    setPrice({ label: p, value: p });

    const roomsF = params.get("roomsFrom");
    setRoomsFrom(roomsF ? parseInt(roomsF) : 0);

    const roomsT = params.get("roomsTo");
    setRoomsTo(roomsT ? parseInt(roomsT) : 0);

    const areaF = params.get("areaFrom");
    setAreaFrom(areaF ? parseInt(areaF) : 0);

    const areaT = params.get("areaTo");
    setAreaTo(areaT ? parseInt(areaT) : 0);

    const features = params.get("features");
    if (features) {
      const featuresArray: Option[] = features.split(",").map(
        (feature): Option => ({
          label: feature,
          value: feature,
        })
      );
      setSelectedFeatures(featuresArray as MultiValue<Option>);
    }
  }, [searchParams]);

  // Funktionen zum Inkrementieren und Dekrementieren der Zahlwerte
  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => prev + 1);
  };

  const decrement = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    current: number
  ) => {
    if (current > 0) {
      setter((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white border border-gray-light dark:border-gray-dark dark:bg-gray-darker p-6 rounded-md mb-8 sm:sticky sm:top-36 z-20 self-start">
      <h2 className="text-2xl font-semibold mb-6">Filter</h2>

      {/* Standort-Filter */}
      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2">
          <MapPin strokeWidth={1.5} /> Ort
        </label>
        <Select<Option, false, GroupBase<Option>>
          id="location"
          options={locationOptions}
          value={location}
          onChange={(selectedOption: SingleValue<Option>) =>
            setLocation(selectedOption)
          }
          isClearable
          placeholder="Ort auswählen"
          className="w-full"
          styles={customSelectStyles}
        />
      </div>

      {/* Typ-Filter */}
      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2">
          <Home strokeWidth={1.5} /> Typ
        </label>
        <Select<Option, false, GroupBase<Option>>
          id="type"
          options={[
            { label: "Beliebig", value: "any" },
            { label: "Haus kaufen", value: "buy house" },
            { label: "Wohnung kaufen", value: "buy apartment" },
            { label: "Wohnung mieten", value: "rent apartment" },
            { label: "Land kaufen", value: "buy land" },
          ]}
          value={type}
          onChange={(selectedOption: SingleValue<Option>) =>
            setType(selectedOption)
          }
          isClearable={false}
          placeholder="Typ auswählen"
          className="w-full"
          styles={customSelectStyles}
        />
      </div>

      {/* Preis-Filter */}
      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2">
          <Euro strokeWidth={1.5} /> Preis
        </label>
        <Select<Option, false, GroupBase<Option>>
          id="price"
          options={[
            { label: "Beliebig", value: "any" },
            { label: "Bis zu 100.000€", value: "100000" },
            { label: "Bis zu 200.000€", value: "200000" },
            { label: "Bis zu 400.000€", value: "400000" },
            { label: "Bis zu 500.000€", value: "500000" },
            { label: "Bis zu 1.000.000€", value: "1000000" },
          ]}
          value={price}
          onChange={(selectedOption: SingleValue<Option>) =>
            setPrice(selectedOption)
          }
          isClearable={false}
          placeholder="Preis auswählen"
          className="w-full"
          styles={customSelectStyles}
        />
      </div>

      {/* Zimmer-Bereichs-Filter */}
      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2">
          <DoorOpen strokeWidth={1.5} /> Zimmer
        </label>
        <div className="flex items-center gap-4">
          {/* Von */}
          <div className="flex items-center border rounded dark:bg-gray-dark">
            <button
              type="button"
              onClick={() => decrement(setRoomsFrom, roomsFrom)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l"
              aria-label="Zimmer von verringern"
            >
              -
            </button>
            <input
              type="string"
              value={roomsFrom}
              onChange={(e) => setRoomsFrom(parseInt(e.target.value) || 0)}
              className="w-16 text-center border-none focus:ring-0 dark:bg-gray-dark dark:text-gray-100"
              placeholder="von"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <button
              type="button"
              onClick={() => increment(setRoomsFrom)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r"
              aria-label="Zimmer von erhöhen"
            >
              +
            </button>
          </div>

          <span className="mx-2">–</span>

          {/* Bis */}
          <div className="flex items-center border rounded dark:bg-gray-dark">
            <button
              type="button"
              onClick={() => decrement(setRoomsTo, roomsTo)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l"
              aria-label="Zimmer bis verringern"
            >
              -
            </button>
            <input
              type="string"
              value={roomsTo}
              onChange={(e) => setRoomsTo(parseInt(e.target.value) || 0)}
              className="w-16 text-center border-none focus:ring-0 dark:bg-gray-dark dark:text-gray-100"
              placeholder="bis"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <button
              type="button"
              onClick={() => increment(setRoomsTo)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r"
              aria-label="Zimmer bis erhöhen"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Fläche-Bereichs-Filter */}
      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2">
          <Maximize2 strokeWidth={1.5} /> Fläche (m²)
        </label>
        <div className="flex items-center gap-4">
          {/* Von */}
          <div className="flex items-center border rounded dark:bg-gray-dark">
            <button
              type="button"
              onClick={() => decrement(setAreaFrom, areaFrom)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l"
              aria-label="Fläche von verringern"
            >
              -
            </button>
            <input
              type="string"
              value={areaFrom}
              onChange={(e) => setAreaFrom(parseInt(e.target.value) || 0)}
              className="w-16 text-center border-none focus:ring-0 dark:bg-gray-dark dark:text-gray-100"
              placeholder="von"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <button
              type="button"
              onClick={() => increment(setAreaFrom)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r"
              aria-label="Fläche von erhöhen"
            >
              +
            </button>
          </div>

          <span className="mx-2">–</span>

          {/* Bis */}
          <div className="flex items-center border rounded dark:bg-gray-dark">
            <button
              type="button"
              onClick={() => decrement(setAreaTo, areaTo)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l"
              aria-label="Fläche bis verringern"
            >
              -
            </button>
            <input
              type="string"
              value={areaTo}
              onChange={(e) => setAreaTo(parseInt(e.target.value) || 0)}
              className="w-16 text-center border-none focus:ring-0 dark:bg-gray-dark dark:text-gray-100"
              placeholder="bis"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <button
              type="button"
              onClick={() => increment(setAreaTo)}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r"
              aria-label="Fläche bis erhöhen"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Ausstattung Multi-Select-Filter */}
      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2">
          <Layers strokeWidth={1.5} /> Ausstattung
        </label>
        <Select<Option, true, GroupBase<Option>>
          options={featureOptions}
          value={selectedFeatures}
          onChange={(selectedOptions: MultiValue<Option>) =>
            setSelectedFeatures(selectedOptions)
          }
          isMulti
          placeholder="Ausstattung auswählen"
          className="w-full"
          styles={customSelectStyles}
        />
      </div>

      {/* Filter anwenden Button */}
      <div className="flex justify-end">
        <Button onClick={handleFilter} className="w-full sm:w-auto">
          Filter anwenden
        </Button>
      </div>
    </div>
  );
}
