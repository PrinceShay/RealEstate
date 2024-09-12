import React from "react";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { start } from "repl";

export default function ProgressItem() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const ProgressItem = useRef(null);
  const ImageRef = useRef(null);
  const ImageContainer = useRef(null);

  useGSAP(
    () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ProgressItem.current,
          start: "left 100%",
          end: "left 0%",
          markers: true,
        },
      });

      tl.from(ImageContainer.current, {
        scale: 0.5,
        duration: 1.5,
        ease: "power4.out",
      });

      tl.from(
        ImageRef.current,
        {
          scale: 2,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "<"
      );
    },
    { scope: ProgressItem }
  );

  return (
    <div ref={ProgressItem} className="w-[45vw] shrink-0">
      <div
        ref={ImageContainer}
        className="aspect-video overflow-hidden rounded-2xl relative "
      >
        <img
          ref={ImageRef}
          className="w-full h-full cover absolute"
          src="/images/index/Hero.jpg"
          alt=""
        />
      </div>
      <div className="mt-8">
        <h2 className="Headline-xs mb-4">Erstgespräch & Bewertung</h2>
        <p>
          Im ersten Schritt lernen wir Sie und Ihre Immobilie kennen. Wir führen
          ein ausführliches Erstgespräch, um Ihre Wünsche und Ziele zu
          verstehen. Gleichzeitig erstellen wir eine professionelle
          Immobilienbewertung, um den bestmöglichen Verkaufspreis festzulegen.
        </p>
      </div>
    </div>
  );
}
