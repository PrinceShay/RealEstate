import Link from "next/link";
import React from "react";

export default function PrimaryButton({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="px-8 rounded-full py-4 bg-mintGreen-light hover:bg-mintGreen-lightHover text-gray-darkest hover:text-gray-dark dark:bg-mintGreen-dark dark:hover:bg-mintGreen-darkHover transition-colors ">
        {title}
      </div>
    </Link>
  );
}
