import EstateHeroLoader from "@/app/components/estate-page/EstateHeroLoader";
import React from "react";

export default function loading() {
  return (
    <main className="px-4 sm:px-16 max-w-[1600px] mx-auto py-4 sm:py-48 w-full">
      <EstateHeroLoader />
    </main>
  );
}
