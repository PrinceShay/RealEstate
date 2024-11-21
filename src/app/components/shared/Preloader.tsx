"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const PreloaderRef = useRef(null);
  useGSAP(() => {
    gsap.to(PreloaderRef.current, {
      scaleY: 0,
      ease: "power4.inOut",
      duration: 2,
    });
  });

  return (
    <div
      ref={PreloaderRef}
      style={{ transformOrigin: "top" }}
      className="w-full h-screen bg-white dark:bg-gray-darkest z-[100] fixed top-0 left-0"
    ></div>
  );
}
