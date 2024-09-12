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
      <div className="px-8 rounded-full py-4 bg-foreground text-background">
        {title}
      </div>
    </Link>
  );
}
