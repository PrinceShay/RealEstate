"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import HeroSearch from "./HeroSearch";
import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  const [isSplit, setSplit] = useState(false);

  const heroHeadline = useRef<HTMLHeadingElement>(null);
  const heroParagraph = useRef(null);
  const heroSearchRef = useRef(null);

  useGSAP(
    () => {
      const elements = document.getElementsByClassName("split");
      Array.from(elements).forEach((element) => {
        new SplitType(element as HTMLElement, {
          types: "words,chars",
        });
      });

      setSplit(true);
      if (heroHeadline && isSplit) {
        gsap.set("#heroTextContainer", { opacity: 1 });
        const heroIn = gsap.timeline({});
        heroIn.from(heroHeadline.current!.querySelectorAll(".word"), {
          yPercent: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 2,
          ease: "power4.out",
        });

        heroIn.from(
          heroParagraph.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
          },
          "<25%"
        );

        heroIn.from(
          heroSearchRef.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
          },
          "<"
        );
      }
    },
    { dependencies: [isSplit] }
  );

  return (
    <section className="h-auto sm:h-[90dvh] w-full px-4 pt-4 pb-24 sm:p-8">
      <div className="relative w-full h-full  rounded-2xl flex items-end justify-center">
        <div className="p-8 sm:p-24 relative w-full h-full flex flex-col items-center justify-end z-20">
          <div className=" flex flex-col text-center text-white mb-12">
            <h1
              ref={heroHeadline}
              className="split text-5xl sm:text-7xl font-medium mb-4 hyphens-auto"
            >
              Finden Sie Ihr Traum&shy;zuhause
            </h1>
            <p ref={heroParagraph} className="split text-xl">
              Entdecken Sie unsere exklusiven Immobilienangebote und finden Sie
              das perfekte Heim für Sie und Ihre Familie.
            </p>
          </div>
          <div className="flex" ref={heroSearchRef}>
            <HeroSearch />
          </div>
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
