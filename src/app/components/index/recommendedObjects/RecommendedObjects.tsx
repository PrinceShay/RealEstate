// RecommendedObjects.tsx
import React, { Suspense } from "react";
import EstateItem from "./EstateItem";
import { EstateCard } from "@/app/lib/interface";
import { getData } from "@/app/lib/getFavorites";
import EstateItemLoader from "./EstateItemLoader";
import ObjectsSlider from "./ObjectsSlider";

export const revalidate = 30;

const RecommendedObjects = async () => {
  const estates: EstateCard[] = await getData();

  return (
    <section className="px-4 sm:px-16 max-w-[1600px] mx-auto py-24">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl mb-6 leading-tight">
          Vorgestellte Immobilien
        </h1>
        <p className="text-lg max-w-4xl mx-auto">
          UBBS ist äußerst erfahren in der Arbeit über verschiedene Sektoren
          hinweg – Wohn-, Gastgewerbe- und Gewerbeimmobilien – und in
          verschiedenen Disziplinen – Architektur und Innenarchitektur.
        </p>
      </div>

      {/* Raster für größere Bildschirme */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-12 mt-24">
        {estates.map((estate) => (
          <Suspense key={estate.slug} fallback={<EstateItemLoader />}>
            <EstateItem estate={estate} />
          </Suspense>
        ))}
      </div>

      {/* Slider für mobile Geräte */}
      <div className="sm:hidden mt-24">
        <ObjectsSlider estates={estates} />
      </div>
    </section>
  );
};

export default RecommendedObjects;
