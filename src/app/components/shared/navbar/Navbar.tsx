import Link from "next/link";
import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

import NavLink from "./NavLink";
import NavBlogContent from "./NavBlogContent";
import NavCompanyContent from "./NavCompanyContent";
import ThemeToggle from "@/app/components/shared/navbar/ThemeToggle";
import FavoriteButton from "./FavoriteButton";

export default function Navbar() {
  return (
    <div className="hidden sm:flex justify-between items-center fixed mt-3 px-16 z-50 w-full">
      <Link className="font-bold" href={"/"}>
        Home<span className="font-medium">Finder</span>
      </Link>
      <div className=" mx-auto px-6 border border-gray-light dark:border-gray-dark flex items-center justify-between py-1 bg-white dark:bg-gray-darkest rounded-full shadow-2xl ">
        <nav>
          <ul className="flex gap-1 items-center">
            <li>
              <NavLink title={"Kaufen"} link={"/immobilien"} />
            </li>
            <li>
              <NavLink
                title={"Wissen"}
                link={"/"}
                dropdownContent={<NavBlogContent />}
              />
            </li>
            <li>
              <NavLink
                title={"Unternehmen"}
                link={"/"}
                dropdownContent={<NavCompanyContent />}
              />
            </li>
            <li className="ml-3">
              <FavoriteButton />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
      <PrimaryButton title="Verkaufen" link="/" />
    </div>
  );
}
