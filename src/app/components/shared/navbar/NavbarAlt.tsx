"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import NavBlogContent from "./NavBlogContent";
import NavCompanyContent from "./NavCompanyContent";
import FavoriteButton from "./FavoriteButton";
import ThemeToggle from "./ThemeToggle";
import PrimaryButton from "../ui/PrimaryButton";

export default function NavbarAlt() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <div>
      <div
        className={`hidden sm:grid
          px-4 py-4 sm:px-16 w-full grid-cols-3 items-center fixed top-0 z-[80] 
          transition-all duration-500 ease-out
          ${isScrolled ? "bg-white dark:bg-gray-darkest shadow-xl" : "bg-transparent"}
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <Link className="font-bold text-xl" href={"/"}>
          Home<span className="font-medium">Finder</span>
        </Link>
        <nav className="place-self-center">
          <ul className="flex gap-1 items-center">
            <li>
              <NavLink title={"Immobilien"} link={"/immobilien"} />
            </li>
            <li>
              <NavLink
                title={"Wissen"}
                link={"/"}
                dropdownContent={<NavBlogContent />}
              />
            </li>
            <li>
              <NavLink title={"Finanzieren"} link={"/"} />
            </li>
            <li>
              <NavLink
                title={"Unternehmen"}
                link={"/"}
                dropdownContent={<NavCompanyContent />}
              />
            </li>
          </ul>
        </nav>
        <div className="flex place-self-end">
          <FavoriteButton />
          <ThemeToggle />
          <PrimaryButton title="Verkaufen" link="/" />
        </div>
      </div>
    </div>
  );
}
