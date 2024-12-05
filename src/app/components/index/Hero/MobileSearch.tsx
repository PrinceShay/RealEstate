"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, MapPin, Euro, Search } from "lucide-react";
import Select, { StylesConfig } from "react-select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { client } from "@/app/lib/sanityClient";

// Define the OptionType for react-select
type OptionType = {
  label: string;
  value: string;
};

// Shared styles for the Select components
const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    color: "black",
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

export default function MobileSearch() {
  const router = useRouter();

  // States for filters
  const [address, setAddress] = useState<OptionType | null>(null);
  const [range, setRange] = useState<OptionType>(rangeOptions[0]);
  const [type] = useState<OptionType>(typeOptions[0]);
  const [price, setPrice] = useState<OptionType>(priceOptions[0]);
  const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);

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

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    const searchKarlsruhe = "#searchKarlsruhe";
    const searchLandau = "#searchLandau";
    const searchBerlin = "#searchBerlin";
    const searchMuenchen = "#searchMünchen";

    // Initialize all elements off-screen
    tl.set([searchKarlsruhe, searchLandau, searchBerlin, searchMuenchen], {
      yPercent: 100,
      autoAlpha: 0,
    });

    // Animation sequence
    tl.set(searchKarlsruhe, { yPercent: 0, autoAlpha: 1 })
      .to({}, { duration: 1 })
      .to(searchKarlsruhe, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      })
      .to(
        searchLandau,
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.inOut" },
        "<"
      )
      .to({}, { duration: 1 })
      .to(searchLandau, { yPercent: -100, duration: 1, ease: "power4.inOut" })
      .to(
        searchBerlin,
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.inOut" },
        "<"
      )
      .to({}, { duration: 1 })
      .to(searchBerlin, { yPercent: -100, duration: 1, ease: "power4.inOut" })
      .to(
        searchMuenchen,
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.inOut" },
        "<"
      )
      .to({}, { duration: 1 })
      .to(searchMuenchen, { yPercent: -100, duration: 1, ease: "power4.inOut" })
      .set(searchKarlsruhe, { yPercent: 100, autoAlpha: 1 }, "<")
      .to(
        searchKarlsruhe,
        { yPercent: 0, duration: 1, ease: "power4.inOut" },
        "<"
      );
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="sm:hidden border rounded-xl w-full pl-4 pr-2 py-2 flex justify-between items-center">
        <div className="relative flex text-gray-lightest items-center overflow-hidden w-full h-full">
          <div id="searchKarlsruhe" className="absolute">
            Karlsruhe
          </div>
          <div id="searchLandau" className="absolute">
            Landau
          </div>
          <div id="searchBerlin" className="absolute">
            Berlin
          </div>
          <div id="searchMünchen" className="absolute">
            München
          </div>
        </div>
        <div className="bg-mintGreen-light rounded-lg p-1">
          <ArrowUpRight />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-gray-darker h-screen bg-opacity-15 backdrop-blur-3xl flex flex-col items-center justify-center p-12">
        <AlertDialogCancel className="absolute right-4 top-4 ">
          X
        </AlertDialogCancel>
        {/* Location and Range */}
        <div className="flex w-full h-auto items-center gap-2 rounded-lg px-4 py-2 border border-white border-opacity-65 hover:border-opacity-100 transition-all bg-transparent">
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

        {/* Price Filter */}
        <div className="flex w-full items-center gap-2 px-4 py-2 rounded-lg border border-white border-opacity-65 hover:border-opacity-100 bg-transparent">
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
          className="flex justify-center w-full py-5 sm:py-0 bg-mintGreen-light dark:bg-mintGreen-dark dark:hover:bg-mintGreen-darkHover text-foreground px-7 rounded-lg items-center gap-2 hover:bg-mintGreen-dark transition-all ease-out"
          onClick={handleSearch}
        >
          <Search />
          Ergebnisse anzeigen
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
