// app/components/immobilienList/RealEstateList.tsx

import { EstateCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanityClient";
import EstateDisplay from "./EstateDisplay";
import EstateListFilter from "./filter/EstateListFilter";
import { Suspense } from "react";

interface RealEstateListProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Helper function to get the first parameter as a string
function getFirstParam(
  param: string | string[] | undefined,
  defaultValue: string = ""
): string {
  if (Array.isArray(param)) {
    return param[0];
  } else if (typeof param === "string") {
    return param;
  } else {
    return defaultValue;
  }
}

// Ensure the component re-renders on searchParams change
export const dynamic = "force-dynamic";

export default async function RealEstateList({
  searchParams,
}: RealEstateListProps) {
  const location = getFirstParam(searchParams.location);
  const type = getFirstParam(searchParams.type);
  const priceFrom = getFirstParam(searchParams.priceFrom);
  const priceTo = getFirstParam(searchParams.priceTo);
  const roomsFrom = getFirstParam(searchParams.roomsFrom);
  const roomsTo = getFirstParam(searchParams.roomsTo);
  const areaFrom = getFirstParam(searchParams.areaFrom);
  const areaTo = getFirstParam(searchParams.areaTo);
  const featuresParam = searchParams.features;

  // Create filters based on the parameters
  const filters: string[] = [];

  const typeMapping: Record<string, string> = {
    "buy house": "Haus",
    "buy apartment": "Wohnung",
    "rent apartment": "Wohnung mieten",
    "buy land": "Grundstück",
  };

  if (location) filters.push(`place->name match "${location}"`);
  if (type) {
    const mappedType = typeMapping[type.toLowerCase()];
    if (mappedType) {
      filters.push(`estateType->name match "${mappedType}"`);
    }
  }
  if (priceFrom) filters.push(`price >= ${Number(priceFrom)}`);
  if (priceTo && priceTo !== "any") filters.push(`price <= ${Number(priceTo)}`);
  if (roomsFrom) filters.push(`rooms >= ${Number(roomsFrom)}`);
  if (roomsTo) filters.push(`rooms <= ${Number(roomsTo)}`);
  if (areaFrom) filters.push(`area >= ${Number(areaFrom)}`);
  if (areaTo) filters.push(`area <= ${Number(areaTo)}`);

  // Process Features
  let featureList: string[] = [];

  if (featuresParam) {
    if (Array.isArray(featuresParam)) {
      featureList = featuresParam;
    } else if (typeof featuresParam === "string") {
      featureList = featuresParam.split(",");
    }
    if (featureList.length > 0) {
      const featureStrings = featureList.map(
        (feature: string) => `"${feature}"`
      );
      // Ensure at least one of the selected features is present
      filters.push(
        `count((features[]->name)[@ in [${featureStrings.join(",")}]]) > 0`
      );
    }
  }

  // Construct the query
  const query = `*[_type == "realEstate" ${
    filters.length ? `&& ${filters.join(" && ")}` : ""
  }]{
    title,
    slug,
    "firstImage": gallery[0].asset->url,
    price,
    rooms,
    gallery[]{
      _key,
      asset->{
        _id,
        url
      },
      caption,
      hotspot
    },
    description,
    _createdAt,
    estateType->{
      name,
    },
    features[]->{
      name
    },
    place->{
      name, 
    },
    
    area
  }`;

  try {
    const estates: EstateCard[] = await client.fetch(query);

    return (
      <section className="px-4 max-w-[1600px] sm:grid grid-cols-3 gap-12 mx-auto pb-24 pt-12 md:pt-24 2xl:pt-48">
        <EstateListFilter />

        {estates.length > 0 ? (
          <EstateDisplay estates={estates} />
        ) : (
          <div className="text-center col-span-2">
            <h2>Keine Immobilien gefunden</h2>
            <p>Versuche, deine Filter anzupassen, oder komme später wieder!</p>
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error("Fehler beim Laden der Immobiliendaten:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Ein unbekannter Fehler ist aufgetreten";

    return (
      <section className="px-4 sm:px-16 max-w-[1600px] mx-auto pt-48 pb-24 relative">
        <EstateListFilter />
        <div className="text-center text-red-500">
          <h2>Etwas ist schief gelaufen</h2>
          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }
}
