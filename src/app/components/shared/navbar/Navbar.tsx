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
    <div className="fixed  px-16 mt-12 z-50 w-full">
      <div className=" max-w-[800px] mx-auto pl-8 pr-3 border border-gray-light dark:border-gray-dark flex items-center justify-between py-3 bg-white dark:bg-gray-darkest rounded-full shadow-2xl ">
        <Link className="font-bold" href={"/"}>
          Home<span className="font-medium">Finder</span>
        </Link>
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
            <li>
              <PrimaryButton title="Verkaufen" link="/" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
