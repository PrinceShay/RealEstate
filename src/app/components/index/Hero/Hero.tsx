"use client";
import React, { useRef, useState } from "react";
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
        const heroIn = gsap.timeline({ delay: 0.9 });

        heroIn.from(heroHeadline.current!.querySelectorAll(".word"), {
          yPercent: 100,
          opacity: 0,
          stagger: 0.03,
          duration: 1.5,
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
          "<15%"
        );

        heroIn.from(
          heroSearchRef.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 2,
            ease: "power4.out",
          },
          "<"
        );
      }
    },
    { dependencies: [isSplit] }
  );

  return (
    <section className="h-auto sm:h-[100dvh] w-full px-4 pt-4 pb-24 sm:p-8">
      <div className="relative w-full h-full  rounded-2xl flex items-end justify-center">
        <div className="p-8 sm:p-36 relative w-full h-full flex flex-col items-center justify-end z-20">
          <div className=" flex flex-col text-center text-white mb-16">
            <div className="overflow-hidden">
              <h1
                ref={heroHeadline}
                className="split text-5xl sm:text-7xl font-medium mb-4 hyphens-auto"
              >
                Finden Sie Ihr Traum&shy;zuhause
              </h1>
            </div>
            <p ref={heroParagraph} className="split text-2xl ">
              Entdecken Sie unsere exklusiven Immobilienangebote und finden Sie
              das perfekte Heim für Sie und Ihre Familie.
            </p>
          </div>
          <div className="flex" ref={heroSearchRef}>
            <HeroSearch />
          </div>
        </div>
        <div className="  w-full h-full rounded-2xl absolute z-10 bg-gradient-to-t from-gray-darker to-[#191f2441]"></div>
        <video
          src="/videos/Features/7578546-hd_1920_1080_30fps.webm"
          className="w-full h-full absolute object-cover rounded-2xl"
          playsInline
          loop
          muted
          autoPlay
        ></video>
      </div>
    </section>
  );
}

export default Hero;
