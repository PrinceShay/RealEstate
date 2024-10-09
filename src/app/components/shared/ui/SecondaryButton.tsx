import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SecondaryButton({
  title,
  // link,
}: {
  title: string;
  link: string;
}) {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-1 group text-mintGreen-light dark:text-mintGreen-dark"
    >
      {title}
      <div className="group-hover:translate-x-2 transition-all ease-out">
        <ChevronRight />
      </div>
    </Link>
  );
}
