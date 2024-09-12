import Link from "next/link";
import React from "react";

export default function NavCompanyContent() {
  return (
    <ul>
      <li>
        <Link href={"/"}>Unsere Mission</Link>
      </li>
      <li>
        <Link href={"/"}>Das Team</Link>
      </li>
      <li>
        <Link href={"/"}>Meow</Link>
      </li>
      <li>
        <Link href={"/"}>Das Team</Link>
      </li>
    </ul>
  );
}
