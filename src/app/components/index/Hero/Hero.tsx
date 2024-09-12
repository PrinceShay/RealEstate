import React from "react";
import Image from "next/image";
import HeroSearch from "./HeroSearch";

function Hero() {
  return (
    <section className="h-screen p-16">
      <div className="relative w-full h-full  rounded-xl flex items-end justify-center overflow-hidden">
        <div className=" p-24 relative w-full h-full flex flex-col items-center justify-end z-20">
          <div className=" flex flex-col text-center text-white mb-12">
            <h1 className="text-7xl font-medium mb-4">Ich bin eine Headline</h1>
            <p className="text-xl">Meow</p>
          </div>
          <HeroSearch />
        </div>
        <div className=" w-full h-full absolute z-10 bg-gradient-to-t from-black"></div>
        <Image
          src={"/images/index/Hero.jpg"}
          alt="Hero"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </div>
    </section>
  );
}

export default Hero;
