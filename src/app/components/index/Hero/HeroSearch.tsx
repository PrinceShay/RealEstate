"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { SingleValue } from "react-select";
import { MapPin, Home, Euro, Search } from "lucide-react"; // Importing Lucide icons
import { client } from "@/app/lib/sanityClient";

// Funktion zum Abrufen der Ortsdaten von Sanity
async function getData() {
  const query = `*[_type == "realEstate"]{
    place->{
      name, 
    },
  }`;
  const locations = await client.fetch(query);
  // Filtern, um doppelte Ortsnamen zu entfernen
  const uniqueLocations = locations.filter(
    (location: { place: { name: string } }, index: number, self: any[]) =>
      index === self.findIndex((loc) => loc.place.name === location.place.name)
  );

  return uniqueLocations.map((location: { place: { name: string } }) => ({
    label: location.place.name, // Label für das Dropdown-Menü
    value: location.place.name, // Wert, der gesetzt wird
  }));
}

export default function HeroSearch() {
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null); // State für die Adresse
  const [range, setRange] = useState<{ label: string; value: string } | null>({
    label: "15 km",
    value: "15",
  }); // Standardwert für Reichweite
  const [type, setType] = useState<{ label: string; value: string } | null>({
    label: "Haus kaufen",
    value: "Buy house",
  }); // Standardwert für Typ
  const [price, setPrice] = useState<{ label: string; value: string } | null>({
    label: "Bis zu 400,000€",
    value: "400000",
  }); // Standardwert für Preis

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  ); // Optionen für das Select-Feld

  const router = useRouter();

  useEffect(() => {
    // Abrufen der Daten von Sanity und Setzen der Optionen für das Dropdown
    async function fetchData() {
      const data = await getData();
      setOptions(data);
    }
    fetchData();
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams({
      location: address?.value || "",
      range: range?.value || "any",
      type: type?.value || "any",
      price: price?.value || "any",
    });

    // Navigation zur Seite '/search' mit Query-Parametern
    router.push(`/immobilien?${query.toString()}`);
  };

  return (
    <div className="bg-white bg-opacity-15 max-w-[1600px] p-6 text-white rounded-3xl flex items-center justify-between gap-6 backdrop-blur-md">
      {/* Ortssuche mit Icon und Dropdown */}
      <div className="flex items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100  transition-all bg-transparent">
        <MapPin className="text-white" />
        <Select
          id="address"
          options={options} // Vorschläge für das Dropdown
          value={address} // Ausgewählter Wert
          onChange={(
            selectedOption: SingleValue<{ label: string; value: string }>
          ) => setAddress(selectedOption)} // Setzen des Wertes bei Auswahl oder Eingabe
          isClearable // Ermöglicht das Löschen der Auswahl
          placeholder="Ort"
          isSearchable // Ermöglicht das Schreiben in das Select-Feld
          className="location-search-input"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              color: "white", // Textfarbe auf hellen Hintergründen ändern
              minWidth: "6em",
              width: "12em",
            }),
            input: (base) => ({
              ...base,
              color: "white", // Eingabetextfarbe
            }),
            singleValue: (base) => ({
              ...base,
              color: "white", // Ausgewählte Option Textfarbe ändern
            }),
            placeholder: (base) => ({
              ...base,
              color: "white", // Platzhalterfarbe weiß setzen
            }),
            menu: (base) => ({
              ...base,
              color: "black", // Textfarbe in der Dropdown-Liste
            }),
            option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#333333" : "transparent", // Hintergrundfarbe der hervorgehobenen Option auf dunkelgrau (#333333) ändern
              color: isFocused ? "white" : "black", // Textfarbe der hervorgehobenen Option ändern
            }),
          }}
        />
        <Select
          id="range"
          options={[
            { label: "Beliebig", value: "any" },
            { label: "0 km", value: "0" },
            { label: "30 km", value: "30" },
            { label: "50 km", value: "50" },
            { label: "100 km", value: "100" },
            { label: "250 km", value: "250" },
          ]} // Vorschläge für die Reichweite
          value={range} // Ausgewählter Wert
          onChange={(
            selectedOption: SingleValue<{ label: string; value: string }>
          ) => setRange(selectedOption)} // Setzen des Wertes bei Auswahl
          isClearable={false} // Keine freie Eingabe nötig
          isSearchable={false} // Keine Suche in diesem Dropdown
          placeholder="Reichweite"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              color: "white", // Textfarbe auf hellen Hintergründen ändern
            }),
            singleValue: (base) => ({
              ...base,
              color: "white", // Ausgewählte Option Textfarbe ändern
            }),
            placeholder: (base) => ({
              ...base,
              color: "white", // Platzhalterfarbe weiß setzen
            }),
            menu: (base) => ({
              ...base,
              color: "black", // Textfarbe in der Dropdown-Liste
            }),
            option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#333333" : "transparent", // Hintergrundfarbe der hervorgehobenen Option auf dunkelgrau ändern
              color: isFocused ? "white" : "black", // Textfarbe der hervorgehobenen Option ändern
            }),
          }}
        />
      </div>

      {/* Objektart */}
      <div className="flex h-full items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 transition-all bg-transparent">
        <Home className="text-white" />
        <Select
          id="type"
          options={[
            { label: "Haus kaufen", value: "Buy house" },
            { label: "Wohnung kaufen", value: "Buy apartment" },
            { label: "Wohnung mieten", value: "Rent apartment" },
            { label: "Land kaufen", value: "Buy land" },
          ]}
          value={type}
          onChange={(selectedOption) => setType(selectedOption)}
          isClearable={false}
          isSearchable={false}
          placeholder="Art"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              color: "white",
              minWidth: "6em",
              width: "12em",
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
            option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#333333" : "transparent",
              color: isFocused ? "white" : "black",
            }),
          }}
        />
      </div>

      {/* Preisfilter */}
      <div className=" cursor-pointer flex h-full items-center gap-2 px-4 py-2 border-b border-white border-opacity-65 hover:border-opacity-100 bg-transparent">
        <Euro className="text-white" />
        <Select
          id="price"
          options={[
            { label: "Beliebig", value: "" },
            { label: "Bis zu 100,000€", value: "100000" },
            { label: "Bis zu 200,000€", value: "200000" },
            { label: "Bis zu 400,000€", value: "400000" },
            { label: "Bis zu 500,000€", value: "500000" },
            { label: "Bis zu 1,000,000€", value: "1000000" },
          ]} // Vorschläge für das Dropdown
          value={price} // Ausgewählter Wert
          onChange={(
            selectedOption: SingleValue<{ label: string; value: string }>
          ) => setPrice(selectedOption)} // Setzen des Wertes bei Auswahl
          isClearable={false} // Keine freie Eingabe nötig
          isSearchable={false} // Keine Suche in diesem Dropdown
          placeholder="Preis"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              color: "white",
              minWidth: "6em",
              width: "12em",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white", // Ausgewählte Option Textfarbe ändern
            }),
            placeholder: (base) => ({
              ...base,
              color: "white", // Platzhalterfarbe weiß lassen
            }),
            menu: (base) => ({
              ...base,
              color: "black", // Textfarbe in der Dropdown-Liste
            }),
            option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#333333" : "transparent", // Hintergrundfarbe der hervorgehobenen Option auf dunkelgrau ändern
              color: isFocused ? "white" : "black", // Textfarbe der hervorgehobenen Option ändern
            }),
          }}
        />
      </div>

      {/* Suchbutton */}
      <button
        className="h-full bg-background text-foreground px-7 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-all ease-out"
        onClick={handleSearch}
      >
        <Search />
        Ergebnisse anzeigen
      </button>
    </div>
  );
}
