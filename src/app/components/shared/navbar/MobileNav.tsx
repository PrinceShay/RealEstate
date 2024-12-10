import { House, Lightbulb, Search, UserRound } from "lucide-react";
import React from "react";
import MobileNavItem from "./MobileNavItem";

export default function MobileNav() {
  return (
    <div className="fixed sm:hidden bottom-4  left-0 z-30 w-full px-4">
      <div className="bg-white dark:bg-gray-dark  items-center rounded-2xl h-16 flex justify-between overflow-hidden text-sm shadow-2xl">
        <MobileNavItem
          title="Home"
          link="/"
          icon={<House className="min-h-full" size={22} />}
        />
        <MobileNavItem
          title="Suchen"
          link="/immobilien"
          icon={<Search className="min-h-full" size={22} />}
        />
        <MobileNavItem
          title="Wissen"
          link="/"
          icon={<Lightbulb className="min-h-full" size={22} />}
        />

        <MobileNavItem
          title="Profil"
          icon={<UserRound className="min-h-full" size={22} />}
        />
      </div>
    </div>
  );
}
