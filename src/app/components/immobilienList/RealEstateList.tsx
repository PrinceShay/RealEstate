import { EstateCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanityClient";
import EstateDisplay from "./EstateDisplay";
import EstateListFilter from "./EstateListFilter";

interface RealEstateListProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Hilfsfunktion, um den ersten Parameter als String zu erhalten
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

export default async function RealEstateList({
  searchParams,
}: RealEstateListProps) {
  const location = getFirstParam(searchParams.location);
  const type = getFirstParam(searchParams.type, "any");
  const priceFrom = getFirstParam(searchParams.priceFrom);
  const priceTo = getFirstParam(searchParams.priceTo);
  const roomsFrom = getFirstParam(searchParams.roomsFrom);
  const roomsTo = getFirstParam(searchParams.roomsTo);
  const areaFrom = getFirstParam(searchParams.areaFrom);
  const areaTo = getFirstParam(searchParams.areaTo);
  const featuresParam = searchParams.features;

  // Filter erstellen basierend auf den Parametern
  const filters: string[] = [];

  const typeMapping: Record<string, string> = {
    "buy house": "Haus",
    "buy apartment": "Wohnung",
    "rent apartment": "Wohnung mieten",
    "buy land": "Grundstück",
  };

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

  // Verarbeitung der Features
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
      filters.push(`features[]->name in [${featureStrings.join(",")}]`);
    }
  }

  // Konstruktion der Abfrage
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

    return (
      <section className="px-4 max-w-[1600px] mx-auto pb-24 pt-12 sm:pt-48">
        <EstateListFilter />
        {estates.length > 0 ? (
          <EstateDisplay estates={estates} />
        ) : (
          <div className="text-center">
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
