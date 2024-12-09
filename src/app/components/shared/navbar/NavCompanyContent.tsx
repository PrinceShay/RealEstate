import Link from "next/link";
import React from "react";

export default function NavCompanyContent() {
  return (
    <ul className="text-gray-darkest dark:text-gray-lightest flex flex-col gap-2">
      <li>
        <Link className="hover:text-gray-dark dark:hover:text-white" href={"/"}>
          Unsere Mission
        </Link>
      </li>
      <li>
        <Link className="hover:text-gray-dark dark:hover:text-white" href={"/"}>
          Das Team
        </Link>
      </li>
      <li>
        <Link className="hover:text-gray-dark dark:hover:text-white" href={"/"}>
          Karriere
        </Link>
      </li>
      <li>
        <Link className="hover:text-gray-dark dark:hover:text-white" href={"/"}>
          Büro
        </Link>
      </li>
    </ul>
  );
}
