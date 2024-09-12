import Link from "next/link";
import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NavLink from "./NavLink";
import NavBlogContent from "./NavBlogContent";
import NavCompanyContent from "./NavCompanyContent";

export default function Navbar() {
  return (
    <div className="fixed  px-16 mt-12 z-50 w-full">
      <div className=" max-w-[800px] mx-auto pl-8 pr-3 flex items-center justify-between py-3 bg-white rounded-full ">
        <p className="font-bold">REAL ESTATE</p>
        <nav>
          <ul className="flex gap-3 items-center">
            <li>
              <NavLink title={"Kaufen"} link={"/"} />
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
              <PrimaryButton title="Verkaufen" link="/" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
