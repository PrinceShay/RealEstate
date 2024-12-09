"use client";
import React, { useRef, useState } from "react";
import SecondaryButton from "../../shared/ui/SecondaryButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

export default function AboutUsIndex() {
  const [isSplit, setSplit] = useState(false);

  const aboutHeadline = useRef<HTMLHeadingElement>(null);
  const aboutTagline = useRef<HTMLParagraphElement>(null);
  const aboutParagraphTop = useRef<HTMLParagraphElement>(null);
  const aboutParagraphBottom = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const elements = document.getElementsByClassName("split");
      Array.from(elements).forEach((element) => {
        new SplitType(element as HTMLElement, {
          types: "words,chars,lines",
        });
      });

      setSplit(true);
      if (aboutHeadline && isSplit) {
        const aboutTL = gsap.timeline({
          scrollTrigger: {
            trigger: aboutHeadline.current,
            start: "top bottom",
            toggleActions: "play pause resume reset",
          },
          delay: 0.25,
        });

        aboutTL.from(aboutHeadline.current!.querySelectorAll(".word"), {
          yPercent: 100,
          opacity: 0,
          stagger: 0.03,
          duration: 1.5,
          ease: "power4.out",
        });
        aboutTL.from(
          aboutTagline.current,
          {
            yPercent: 100,
            duration: 1.5,

            opacity: 0,
            ease: "power3.out",
          },
          "<"
        );
        aboutTL.from(
          aboutParagraphTop.current!.querySelectorAll(".line"),
          {
            xPercent: 20,
            opacity: 0,
            ease: "power4.out",
            duration: 1.8,
            stagger: 0.04,
          },
          "<10%"
        );
        aboutTL.from(
          aboutParagraphBottom.current!.querySelectorAll(".line"),
          {
            xPercent: 20,
            opacity: 0,
            duration: 1.8,
            ease: "power4.out",
            stagger: 0.04,
          },
          "<5%"
        );
      }
    },
    { dependencies: [isSplit] }
  );
  return (
    <section className="px-4 sm:px-16 overflow-x-hidden max-w-[1600px] mx-auto py-24 grid grid-cols-1 gap-12 sm:grid-cols-12  border-t border-gray-dark dark:border-gray-light">
      <div className="col-span-6">
        <p
          ref={aboutTagline}
          className="text-mintGreen-light dark:text-mintGreen-dark"
        >
          Über uns
        </p>
        <h1
          ref={aboutHeadline}
          className="split text-4xl sm:text-5xl leading-tight"
        >
          Was uns ausmacht
        </h1>
      </div>
      <div className="col-span-6 text-lg">
        <div className="mb-4">
          <p ref={aboutParagraphTop} className="split">
            Hey! Wir sind das Team von HomeFinder – junge, motivierte
            Immobilienexperten, die wissen, was du brauchst. Mit frischem Blick
            und viel Leidenschaft begleiten wir dich vom ersten Klick bis zum
            Einzug.
          </p>
          <p ref={aboutParagraphBottom} className="split mt-6">
            Deine Zufriedenheit ist unser Antrieb! Wir setzen auf persönliche
            Betreuung und nutzen moderne Technologien, um deine Immobiliensuche
            easy zu gestalten. Dank unserer lokalen Expertise und einem starken
            Netzwerk finden wir immer die besten Angebote für dich. Transparenz
            und Nachhaltigkeit stehen bei uns an erster Stelle – so findest du
            nicht nur ein Zuhause, sondern das richtige Zuhause.
          </p>
        </div>
        <SecondaryButton title="Mehr erfahren" link="/" />
      </div>
    </section>
  );
}
