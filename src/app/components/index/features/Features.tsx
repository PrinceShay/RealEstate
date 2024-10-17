"use client";
import React, { useRef } from "react";
import FeatureItemContainer from "./featureItems/FeatureItemContainer";
import {
  Bewertung,
  Expose,
  Finazierung,
  Marketing,
  Staging,
} from "./featureItems/FeatureLib";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Features() {
  const FeatureContainer = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!FeatureContainer.current) return;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: FeatureContainer.current,
          start: "top bottom",
          markers: true,
        },
      });

      if (FeatureContainer.current.children) {
        tl.fromTo(
          ".js-featureItemContainer",
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "power4.out",
            duration: 1.5,
            stagger: { amount: 0.5 },
          }
        );
      }
    },
    { scope: FeatureContainer }
  );

  return (
    <section
      ref={FeatureContainer}
      className="min-h-screen px-16 max-w-[1600px] mx-auto py-24 grid grid-cols-12 grid-rows-3 gap-6"
    >
      <FeatureItemContainer
        className="js-featureItemContainer row-span-1 col-span-4"
        content={<Marketing />}
      />
      <FeatureItemContainer
        className="js-featureItemContainer row-span-1 col-span-8"
        content={<Bewertung />}
      />
      <FeatureItemContainer
        className="js-featureItemContainer row-span-1 col-span-6"
        content={<Expose />}
      />
      <FeatureItemContainer
        className="js-featureItemContainer row-span-1 col-span-6"
        content={<Finazierung />}
      />
      <FeatureItemContainer
        className="js-featureItemContainer row-span-1 col-span-12"
        content={<Staging />}
      />
    </section>
  );
}
