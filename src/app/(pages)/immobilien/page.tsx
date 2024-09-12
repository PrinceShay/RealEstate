"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EstateItemLoader from "@/app/components/index/recommendedObjects/EstateItemLoader";
import { RealEstateList } from "@/app/components/immobilienList/RealEstateList";

const Page = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "any";
  const price = searchParams.get("price") || "any";

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
      <RealEstateList location={location} type={type} price={price} />
    </Suspense>
  );
};

export default Page;
