// app/immobilienList/[slug]/page.tsx

import React from "react";
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
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  // Await both params and searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { slug } = resolvedParams;
  const hasFilters = Object.keys(resolvedSearchParams).length > 0;

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
  const location = getFirstParam(resolvedSearchParams.location, "Deutschland");
  const type = getFirstParam(resolvedSearchParams.type, "Angebote");
  const priceFrom = getFirstParam(resolvedSearchParams.priceFrom);
  const priceTo = getFirstParam(resolvedSearchParams.priceTo);
  const roomsFrom = getFirstParam(resolvedSearchParams.roomsFrom);
  const roomsTo = getFirstParam(resolvedSearchParams.roomsTo);
  const areaFrom = getFirstParam(resolvedSearchParams.areaFrom);
  const areaTo = getFirstParam(resolvedSearchParams.areaTo);
  const featuresParam = resolvedSearchParams.features;

  // Construct the title
  let title = `Immobilien ${type}`;
  if (location) {
    title += ` in ${location}`;
  }

  // Construct the description
  let description = `Entdecken Sie eine Vielzahl von Immobilien zum ${type.toLowerCase()} in ${location}. `;
  if (priceFrom || priceTo) {
    description += `Preise von ${priceFrom || "Beliebig"} bis ${
      priceTo || "unbegrenzt"
    }. `;
  }
  if (roomsFrom || roomsTo) {
    description += `Anzahl der Zimmer: ${roomsFrom || "Beliebig"} bis ${
      roomsTo || "unbegrenzt"
    }. `;
  }
  if (areaFrom || areaTo) {
    description += `Wohnfläche von ${areaFrom || "Beliebig"} bis ${
      areaTo || "unbegrenzt"
    } Quadratmetern. `;
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
  try {
    // Fetch available slugs from your data source
    const response = await fetch("https://your-api.com/real-estate-slugs");

    if (!response.ok) {
      throw new Error("Failed to fetch slugs");
    }

    const posts: { slug: string }[] = await response.json();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Page Component
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  try {
    // Await both params and searchParams
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const { slug } = resolvedParams;

    return <RealEstateList slug={slug} searchParams={resolvedSearchParams} />;
  } catch (error) {
    console.error("Error rendering Page component:", error);
    return <div>Etwas ist schief gelaufen.</div>;
  }
}
