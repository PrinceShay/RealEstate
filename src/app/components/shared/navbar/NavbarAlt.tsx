"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import NavBlogContent from "./NavBlogContent";
import NavCompanyContent from "./NavCompanyContent";
import FavoriteButton from "./FavoriteButton";
import ThemeToggle from "./ThemeToggle";
import PrimaryButton from "../ui/PrimaryButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function NavbarAlt() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navbarRef = useRef<HTMLDivElement>(null); // Ref für die Navbar

  // Scroll-Logik bleibt unverändert
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hintergrundfarbe basierend auf Scrollposition
      setIsScrolled(currentScrollY > 0);

      // Scrollrichtung bestimmen
      if (currentScrollY > lastScrollY && currentScrollY > 250) {
        // Nach unten scrollen
        setIsVisible(false);
      } else {
        // Nach oben scrollen
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // GSAP-Animation mit Stagger
  useGSAP(
    () => {
      if (navbarRef.current) {
        const items =
          navbarRef.current.querySelectorAll<HTMLElement>(".navbar-item");

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: -20, // Start 20px oberhalb
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power4.out",
            delay: 1.5, // Start nach 0.8 Sekunden
            stagger: 0.07, // 0.2 Sekunden Verzögerung zwischen den Elementen
          }
        );
      }
    },
    { dependencies: [] } // Leere Abhängigkeiten, um die Animation nur einmal beim Mounten auszuführen
  );

  return (
    <div>
      <div
        ref={navbarRef}
        className={`hidden sm:grid
          px-4 py-4 sm:px-16 w-full grid-cols-3 items-center fixed top-0 z-[80] 
          transition-all duration-500 ease-out
          ${isScrolled ? "bg-white dark:bg-gray-darkest shadow-xl" : "bg-transparent"}
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Link-Komponente mit 'navbar-item' Klasse */}
        <Link className="font-bold text-xl navbar-item" href={"/"}>
          Home<span className="font-medium">Finder</span>
        </Link>

        {/* Navigationslinks */}
        <nav className="place-self-center">
          <ul className="flex gap-1 items-center">
            <li className="navbar-item">
              <NavLink title={"Immobilien"} link={"/immobilien"} />
            </li>
            <li className="navbar-item">
              <NavLink
                title={"Wissen"}
                link={"/"}
                dropdownContent={<NavBlogContent />}
              />
            </li>
            <li className="navbar-item">
              <NavLink title={"Finanzieren"} link={"/"} />
            </li>
            <li className="navbar-item">
              <NavLink
                title={"Unternehmen"}
                link={"/"}
                dropdownContent={<NavCompanyContent />}
              />
            </li>
          </ul>
        </nav>

        {/* Buttons am Ende der Navbar */}
        <div className="flex place-self-end">
          <div className="navbar-item">
            <FavoriteButton />
          </div>
          <div className="navbar-item">
            <ThemeToggle />
          </div>
          <div className="navbar-item">
            <PrimaryButton title="Verkaufen" link="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
