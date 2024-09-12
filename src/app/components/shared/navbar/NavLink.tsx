import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavLink({
  title,
  link,
  dropdownContent,
}: {
  title: string;
  link: string;
  dropdownContent?: any;
}) {
  return (
    <div className="relative group">
      <Link href={link}>
        <div className="flex items-center gap-1">
          {title}
          {/* Chevron nur anzeigen, wenn dropdownContent vorhanden ist */}
          {dropdownContent && (
            <ChevronDown
              className="group-hover:rotate-180 transition-all ease-out"
              size={16}
            />
          )}
        </div>
      </Link>
      {/* Dropdown nur anzeigen, wenn dropdownContent vorhanden ist */}
      {dropdownContent && (
        <div className="shadow-2xl origin-top absolute p-6 rounded-xl min-w-64 opacity-0 hidden bg-background text-foreground transition-[opacity] border group-hover:opacity-100 group-hover:block">
          {dropdownContent}
        </div>
      )}
    </div>
  );
}
