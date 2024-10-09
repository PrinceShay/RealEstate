"use client";

import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { client } from "@/app/lib/sanityClient";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Home, Euro, Filter } from "lucide-react"; // Icons

// Import shadcn Dialog components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Import shadcn Button component
import { Button } from "@/components/ui/button";

// Function to fetch features from Sanity
async function getFeatures() {
  const query = `*[_type == "estateFeatures"] {
  name
}`;
  const features = await client.fetch(query);

  return features.map((feature: { name: string }) => ({
    label: feature.name,
    value: feature.name,
  }));
}

// Function to fetch location options (from HeroSearch)
async function getLocations() {
  const query = `*[_type == "realEstate"]{
    place->{
      name, 
    },
  }`;
  const locations = await client.fetch(query);
  // Filter to remove duplicate place names
  const uniqueLocations = locations.filter(
    (location: { place: { name: string } }, index: number, self: any[]) =>
      index === self.findIndex((loc) => loc.place.name === location.place.name)
  );

  return uniqueLocations.map((location: { place: { name: string } }) => ({
    label: location.place.name,
    value: location.place.name,
  }));
}

export default function EstateListFilter() {
  // States for the main filters
  const [location, setLocation] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [type, setType] = useState<{ label: string; value: string } | null>({
    label: "Beliebig",
    value: "any",
  });
  const [price, setPrice] = useState<{ label: string; value: string } | null>({
    label: "Beliebig",
    value: "any",
  });

  // States for the additional filters (inside the dialog)
  const [roomsFrom, setRoomsFrom] = useState<string>("");
  const [roomsTo, setRoomsTo] = useState<string>("");
  const [areaFrom, setAreaFrom] = useState<string>("");
  const [areaTo, setAreaTo] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [featureOptions, setFeatureOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // States for options
  const [locationOptions, setLocationOptions] = useState<
    { label: string; value: string }[]
  >([]);

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

  // Function to handle filter submission
  const handleFilter = () => {
    const query = new URLSearchParams({
      location: location?.value || "",
      type: type?.value || "any",
      price: price?.value || "any",
      roomsFrom: roomsFrom || "",
      roomsTo: roomsTo || "",
      areaFrom: areaFrom || "",
      areaTo: areaTo || "",
      features: selectedFeatures.map((f) => f.value).join(",") || "",
    });

    // Navigate to the same page with updated query parameters
    router.push(`/immobilien?${query.toString()}`);
  };

  // Initialize filters from URL query parameters
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

    setRoomsFrom(params.get("roomsFrom") || "");
    setRoomsTo(params.get("roomsTo") || "");
    setAreaFrom(params.get("areaFrom") || "");
    setAreaTo(params.get("areaTo") || "");
    const features = params.get("features");
    if (features) {
      const featuresArray = features.split(",").map((feature) => ({
        label: feature,
        value: feature,
      }));
      setSelectedFeatures(featuresArray);
    }
  }, [searchParams]);

  return (
    <div className="bg-white border border-gray-light dark:border-gray-dark dark:bg-gray-darker p-4 rounded-md mb-8 sticky top-36 z-20 ">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>
      <div className="flex flex-wrap items-center gap-4">
        {/* Location Filter */}
        <div className="flex items-center gap-2">
          <MapPin strokeWidth={1.5} />
          <Select
            id="location"
            options={locationOptions}
            value={location}
            onChange={(selectedOption) => setLocation(selectedOption)}
            isClearable
            placeholder="Ort"
            className="min-w-[150px] "
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <Home strokeWidth={1.5} />
          <Select
            id="type"
            options={[
              { label: "Beliebig", value: "any" },
              { label: "Haus kaufen", value: "buy house" },
              { label: "Wohnung kaufen", value: "buy apartment" },
              { label: "Wohnung mieten", value: "rent apartment" },
              { label: "Land kaufen", value: "buy land" },
            ]}
            value={type}
            onChange={(selectedOption) => setType(selectedOption)}
            isClearable={false}
            placeholder="Beliebig"
            className="min-w-[150px]"
          />
        </div>

        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <Euro strokeWidth={1.5} />
          <Select
            id="price"
            options={[
              { label: "Beliebig", value: "any" },
              { label: "Bis zu 100,000€", value: "100000" },
              { label: "Bis zu 200,000€", value: "200000" },
              { label: "Bis zu 400,000€", value: "400000" },
              { label: "Bis zu 500,000€", value: "500000" },
              { label: "Bis zu 1,000,000€", value: "1000000" },
            ]}
            value={price}
            onChange={(selectedOption) => setPrice(selectedOption)}
            isClearable={false}
            placeholder="Preis"
            className="min-w-[150px]"
          />
        </div>

        {/* More Filters Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent dark:border-gray-light dark:hover:bg-gray-dark"
            >
              <Filter strokeWidth={1.5} />
              Weitere Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Weitere Filter</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Rooms Range Filter */}
              <div className="col-span-2">
                <label className="block mb-1">Zimmer</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={roomsFrom}
                    onChange={(e) => setRoomsFrom(e.target.value)}
                    className="w-full border p-2 rounded dark:bg-gray-dark"
                    placeholder="egal"
                  />
                  –
                  <input
                    type="number"
                    value={roomsTo}
                    onChange={(e) => setRoomsTo(e.target.value)}
                    className="w-full border p-2 rounded dark:bg-gray-dark"
                    placeholder="egal"
                  />
                </div>
              </div>

              {/* Area Range Filter */}
              <div className="col-span-2">
                <label className="block mb-1">Fläche</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={areaFrom}
                    onChange={(e) => setAreaFrom(e.target.value)}
                    className="w-full border p-2 rounded dark:bg-gray-dark"
                    placeholder="egal"
                  />
                  –
                  <input
                    type="number"
                    value={areaTo}
                    onChange={(e) => setAreaTo(e.target.value)}
                    className="w-full border p-2 rounded dark:bg-gray-dark"
                    placeholder="egal"
                  />
                </div>
              </div>

              {/* Features Multi-Select Filter */}
              <div className="md:col-span-2">
                <label className="block mb-1">Ausstattung</label>
                <Select
                  options={featureOptions}
                  value={selectedFeatures}
                  onChange={(selectedOptions) =>
                    setSelectedFeatures(selectedOptions || [])
                  }
                  isMulti
                  placeholder="Ausstattung auswählen"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Schließen</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  handleFilter();
                }}
              >
                Filter anwenden
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Apply Filters Button */}
        <Button onClick={handleFilter} className="ml-auto">
          Filter anwenden
        </Button>
      </div>
    </div>
  );
}
