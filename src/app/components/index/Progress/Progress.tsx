"use client";
import React from "react";
import ProgressItem from "./ProgressItem";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Progress() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const ProgressContainer = useRef(null);
  const ProgressItemRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(ProgressItemRef.current, {
        xPercent: -100,
        scrollTrigger: {
          trigger: ProgressContainer.current,
          start: "0% 0%",
          end: "100% 0%",
          markers: true,
          scrub: true,
        },
      });
    },
    { scope: ProgressContainer }
  );

  return (
    <section className=" relative bg-gray-darkest dark:bg-gray-darker text-gray-lightest py-48 ">
      <div className="pl-4 sm:pl-64 relative mb-16 max-w-screen overflow-hidden">
        <h1 className="Headline-md mb-6">Ablauf</h1>
        <p className="text-lg mb-16">
          UBBS is vastly experienced at working across sectors – Residential,
          Hospitality and Commercial, and across disciplines – Architecture and
          Interior Design.
        </p>
      </div>

      <div ref={ProgressContainer} className="min-h-[350vh]">
        <div className="pl-4 sm:pl-64 sticky top-48 min-h-screen max-w-screen overflow-hidden">
          <div
            ref={ProgressItemRef}
            className=" flex flex-nowrap relative  w-auto gap-24"
          >
            <ProgressItem />
            <div className="mt-24">
              <ProgressItem />
            </div>
            <ProgressItem />
          </div>
        </div>
      </div>
    </section>
  );
}
