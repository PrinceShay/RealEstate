import React, { Suspense } from "react";
import EstateItem from "./EstateItem";
import { EstateCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanityClient";
import EstateItemLoader from "./EstateItemLoader";

export const revalidate = 30;

async function getData() {
  const query = `*[_type == "realEstate"]{
    title,
    slug,
    "firstImage": gallery[0].asset->url,
    price,
    place->{
      name, 
    },
    area
  }`;
  const estates = await client.fetch(query);
  return estates;
}

const RecommendedObjects = async () => {
  const estates: EstateCard[] = await getData();

  return (
    <section className="px-4 sm:px-16 max-w-[1600px] mx-auto py-24">
      <div className="text-center">
        <h1 className="Headline-md mb-6 leading-tight">
          Vorgestellte Immobilien
        </h1>
        <p>
          UBBS is vastly experienced at working across sectors – Residential,
          Hospitality and Commercial, and across disciplines – Architecture and
          Interior Design.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-24">
        {estates.map((estate) => (
          <Suspense key={estate.slug} fallback={<EstateItemLoader />}>
            <EstateItem estate={estate} key={estate.slug} />
          </Suspense>
        ))}
      </div>
    </section>
  );
};

export default RecommendedObjects;
