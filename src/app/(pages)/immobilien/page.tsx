// app/immobilienList/[slug]/page.tsx

import RealEstateList from "@/app/components/immobilienList/RealEstateList";
import { Metadata } from "next";

// Define the structure of search parameters
interface SearchParams {
  [key: string]: string | string[] | undefined;
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

// Generate Metadata based on params and searchParams
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { slug } = await params; // Await the params here if needed

  const hasFilters = Object.keys(searchParams).length > 0;

  if (!hasFilters) {
    return {
      title: "Immobilien Angebote",
      description: "Finden Sie die besten Immobilienangebote in Deutschland.",
      openGraph: {
        title: "Immobilien Angebote",
        description: "Finden Sie die besten Immobilienangebote in Deutschland.",
        // Optionally, add a default image or other Open Graph properties
        // images: [{ url: "/default-og-image.jpg", alt: "Immobilienangebote" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Immobilien Angebote",
        description: "Finden Sie die besten Immobilienangebote in Deutschland.",
        // Optionally, add a default image for Twitter cards
        // images: ["/default-twitter-image.jpg"],
      },
    };
  }

  // Extract parameters with defaults
  const location = getFirstParam(searchParams.location, "Deutschland");
  const type = getFirstParam(searchParams.type, "Angebote");
  const priceFrom = getFirstParam(searchParams.priceFrom);
  const priceTo = getFirstParam(searchParams.priceTo);
  const roomsFrom = getFirstParam(searchParams.roomsFrom);
  const roomsTo = getFirstParam(searchParams.roomsTo);
  const areaFrom = getFirstParam(searchParams.areaFrom);
  const areaTo = getFirstParam(searchParams.areaTo);
  const featuresParam = searchParams.features;

  // Construct the title
  let title = `Immobilien ${type}`;
  if (location) {
    title += ` in ${location}`;
  }

  // Construct the description
  let description = `Entdecken Sie eine Vielzahl von Immobilien zum ${type.toLowerCase()} in ${location}. `;
  if (priceFrom || priceTo) {
    description += `Preise von ${priceFrom || "Beliebig"} bis ${priceTo || "unbegrenzt"}. `;
  }
  if (roomsFrom || roomsTo) {
    description += `Anzahl der Zimmer: ${roomsFrom || "Beliebig"} bis ${roomsTo || "unbegrenzt"}. `;
  }
  if (areaFrom || areaTo) {
    description += `Wohnfläche von ${areaFrom || "Beliebig"} bis ${areaTo || "unbegrenzt"} Quadratmetern. `;
  }
  if (featuresParam) {
    const features = Array.isArray(featuresParam)
      ? featuresParam.join(", ")
      : featuresParam;
    description += `Ausstattung: ${features}.`;
  }

  description =
    description.trim() ||
    "Finden Sie die besten Immobilienangebote in Deutschland.";

  return {
    title: title || "Immobilien Angebote",
    description,
    openGraph: {
      title: title || "Immobilien Angebote",
      description,
      // Optionally, add a default image or other Open Graph properties
      // images: [{ url: "/default-og-image.jpg", alt: "Immobilienangebote" }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Immobilien Angebote",
      description,
      // Optionally, add a default image for Twitter cards
      // images: ["/default-twitter-image.jpg"],
    },
  };
}

// Generate Static Params (Optional)
export async function generateStaticParams() {
  // Fetch available slugs from your data source
  const response = await fetch("https://your-api.com/real-estate-slugs");

  if (!response.ok) {
    throw new Error("Failed to fetch slugs");
  }

  const posts: { slug: string }[] = await response.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Page Component
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params; // Await the params here

  return <RealEstateList slug={slug} searchParams={searchParams} />;
}
