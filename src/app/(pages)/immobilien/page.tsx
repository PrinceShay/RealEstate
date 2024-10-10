"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EstateItemLoader from "@/app/components/index/recommendedObjects/EstateItemLoader";
import { RealEstateList } from "@/app/components/immobilienList/RealEstateList";

// Force dynamic rendering to prevent build-time errors
export const dynamic = "force-dynamic";

const Page = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "any";
  const priceFrom = searchParams.get("priceFrom") || "";
  const priceTo = searchParams.get("priceTo") || "";
  const roomsFrom = searchParams.get("roomsFrom") || "";
  const roomsTo = searchParams.get("roomsTo") || "";
  const areaFrom = searchParams.get("areaFrom") || "";
  const areaTo = searchParams.get("areaTo") || "";
  const features = searchParams.get("features") || "";

  return (
    <Suspense
      fallback={
        <section className="px-16 max-w-[1600px] mx-auto py-24">
          <div className="grid grid-cols-3 gap-12 mt-24">
            {Array.from({ length: 3 }).map((_, index) => (
              <EstateItemLoader key={index} />
            ))}
          </div>
        </section>
      }
    >
      <RealEstateList
        location={location}
        type={type}
        priceFrom={priceFrom}
        priceTo={priceTo}
        roomsFrom={roomsFrom}
        roomsTo={roomsTo}
        areaFrom={areaFrom}
        areaTo={areaTo}
        features={features}
      />
    </Suspense>
  );
};

export default Page;
