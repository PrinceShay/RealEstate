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
    <section className="px-0 sm:px-16 max-w-[1600px] mx-auto py-24">
      <div className="text-center px-4 sm:px-0">
        <h1 className="text-4xl sm:text-5xl mb-6 leading-tight">
          Vorgestellte Immobilien
        </h1>
        <p className="text-lg max-w-4xl mx-auto">
          Schau dir unsere aktuellen Immobilien an und finde dein neues Zuhause!
          Egal ob stylishe Wohnung in der City oder gemütliches Haus im Grünen –
          bei uns wirst du fündig.
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
