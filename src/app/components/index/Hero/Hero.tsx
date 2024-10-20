import React from "react";
import Image from "next/image";
import HeroSearch from "./HeroSearch";

function Hero() {
  return (
    <section className="h-[100dvh] w-full px-4 pt-4 pb-24 sm:p-8">
      <div className="relative w-full h-full  rounded-2xl flex items-end justify-center">
        <div className="p-8 sm:p-24 relative w-full h-full flex flex-col items-center justify-end z-20">
          <div className=" flex flex-col text-center text-white mb-12">
            <h1 className="text-5xl sm:text-7xl font-medium mb-4">
              Finden Sie Ihr Traumzuhause
            </h1>
            <p className="text-xl">
              Entdecken Sie unsere exklusiven Immobilienangebote und finden Sie
              das perfekte Heim für Sie und Ihre Familie.
            </p>
          </div>
          <HeroSearch />
        </div>
        <div className=" w-full h-full rounded-2xl absolute z-10 bg-gradient-to-t from-gray-darker to-[#191f2491]"></div>
        <Image
          src={"/images/index/Hero.jpg"}
          alt="Hero"
          fill
          className="w-full h-full object-cover absolute rounded-2xl"
        />
      </div>
    </section>
  );
}

export default Hero;
