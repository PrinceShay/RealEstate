// RealEstateList.tsx

import { EstateCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanityClient";
import EstateDisplay from "./EstateDisplay";
import EstateListFilter from "./EstateListFilter";

// Define the props interface
interface RealEstateListProps {
  location: string;
  type: string;
  priceFrom?: string;
  priceTo?: string;
  roomsFrom?: string;
  roomsTo?: string;
  areaFrom?: string;
  areaTo?: string;
  features?: string;
}

// This is the server component for fetching data
export async function RealEstateList(props: RealEstateListProps) {
  const {
    location = "",
    type = "any",
    priceFrom = "",
    priceTo = "",
    roomsFrom = "",
    roomsTo = "",
    areaFrom = "",
    areaTo = "",
    features = "",
  } = props;

  // Rest of your code remains the same, using the props instead of `useSearchParams`

  // Create an array of filters based on the selected values
  const filters: string[] = [];

  // Mapping for type conversion
  const typeMapping: Record<string, string> = {
    "buy house": "Haus",
    "buy apartment": "Wohnung",
    "rent apartment": "Wohnung mieten",
    "buy land": "Grundstück",
  };

  // Add filters only if values are present
  if (location) filters.push(`place->name match "${location}"`);
  if (type !== "any") {
    const mappedType = typeMapping[type.toLowerCase()];
    if (mappedType) {
      filters.push(`estateType->name match "${mappedType}"`);
    }
  }
  if (priceFrom) filters.push(`price >= ${priceFrom}`);
  if (priceTo) filters.push(`price <= ${priceTo}`);
  if (roomsFrom) filters.push(`rooms >= ${roomsFrom}`);
  if (roomsTo) filters.push(`rooms <= ${roomsTo}`);
  if (areaFrom) filters.push(`area >= ${areaFrom}`);
  if (areaTo) filters.push(`area <= ${areaTo}`);

  // Handle features (multiple selections)
  if (features) {
    const featureList = features.split(",").map((feature) => `"${feature}"`);
    filters.push(`features[]->name in [${featureList.join(",")}]`);
  }

  // Construct the query dynamically based on the filters
  const query = `*[_type == "realEstate" ${
    filters.length ? `&& ${filters.join(" && ")}` : ""
  }]{
    title,
    slug,
    "firstImage": gallery[0].asset->url,
    price,
    rooms,
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

    // If no estates are found, return a message
    if (estates.length === 0) {
      return (
        <section className="px-16 max-w-[1600px] mx-auto pb-24 pt-48">
          <EstateListFilter />
          <div className="text-center">
            <h2>No real estate items found</h2>
            <p>Try adjusting your filters or come back later!</p>
          </div>
        </section>
      );
    }

    // If estates are found, render the client component
    return (
      <section className="px-16 max-w-[1600px] mx-auto pb-24 pt-48">
        <EstateListFilter />
        <EstateDisplay estates={estates} />
      </section>
    );
  } catch (error) {
    // Log the error to the console for detailed inspection
    console.error("Error fetching real estate data:", error);

    // Show an error message to the user
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return (
      <section className="px-16 max-w-[1600px] mx-auto pt-48 pb-24 relative">
        <EstateListFilter />
        <div className="text-center text-red-500">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }
}
