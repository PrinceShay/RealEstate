"use client";

import { useSearchParams } from "next/navigation";
import { RealEstateList } from "@/app/components/immobilienList/RealEstateList";

const RealEstateListWrapper = () => {
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
  );
};

export default RealEstateListWrapper;
