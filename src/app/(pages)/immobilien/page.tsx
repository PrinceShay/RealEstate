import { Suspense } from "react";
import EstateItemLoader from "@/app/components/index/recommendedObjects/EstateItemLoader";
import RealEstateListWrapper from "@/app/components/immobilienList/RealEstateListWrapper";

const Page = () => {
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
      <RealEstateListWrapper />
    </Suspense>
  );
};

export default Page;
