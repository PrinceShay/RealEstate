import EstateItem from "@/app/components/index/recommendedObjects/EstateItem";
import EstateItemLoader from "@/app/components/index/recommendedObjects/EstateItemLoader";
import { EstateCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanityClient";

// This is the server component for fetching data
export async function RealEstateList({
  location,
  type,
  price,
}: {
  location: string;
  type: string;
  price: string;
}) {
  // Create an array of filters based on the selected values
  let filters: string[] = [];

  // Mapping for type conversion
  const typeMapping: Record<string, string> = {
    "buy house": "Haus",
    "buy apartment": "Wohnung",
    "rent apartment": "Wohnung mieten",
    "buy land": "Grundstück",
  };

  // Add filters only if values are present
  if (location) filters.push(`place->name match "${location}"`); // Use match for less strict comparison
  if (type !== "any") {
    const mappedType = typeMapping[type]; // Map the type to the correct value
    if (mappedType) {
      filters.push(`estateType->name match "${mappedType}"`);
    }
  }
  if (price !== "any") filters.push(`price <= ${price}`);

  // Construct the query dynamically based on the filters
  const query = `*[_type == "realEstate" ${filters.length ? `&& ${filters.join(" && ")}` : ""}]{
    title,
    slug,
    "firstImage": gallery[0].asset->url,
    price,
    estateType->{
      name,
    },
    place->{
      name, 
    },
    area
  }`;

  // Log the generated query for debugging purposes
  console.log("Generated query:", query);

  try {
    const estates: EstateCard[] = await client.fetch(query);

    // If no estates are found, return a message
    if (estates.length === 0) {
      return (
        <section className="px-16 max-w-[1600px] mx-auto py-24">
          <div className="text-center">
            <h2>No real estate items found</h2>
            <p>Try adjusting your filters or come back later!</p>
          </div>
        </section>
      );
    }

    // If estates are found, map and render them
    return (
      <section className="px-16 max-w-[1600px] mx-auto py-24">
        <div className="grid grid-cols-3 gap-12 mt-24">
          {estates.map((estate) => (
            <EstateItem key={estate.slug} estate={estate} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    // Log the error to the console for detailed inspection
    console.error("Error fetching real estate data:", error);

    // Show an error message to the user
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return (
      <section className="px-16 max-w-[1600px] mx-auto py-24">
        <div className="text-center text-red-500">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }
}
