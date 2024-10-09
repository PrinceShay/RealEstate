"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NavLink({
  title,
  link,
  dropdownContent,
}: {
  title: string;
  link: string;
  dropdownContent?: any;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={link}>
        <div className="flex items-center gap-1 hover:bg-gray-lighter dark:hover:bg-gray-darker p-3 rounded-xl ">
          {title}
          {/* Chevron nur anzeigen, wenn dropdownContent vorhanden ist */}
          {dropdownContent && (
            <ChevronDown
              className={`transition-all ease-out ${isDropdownOpen ? "rotate-180" : ""}`}
              size={16}
            />
          )}
        </div>
      </Link>

      {dropdownContent && (
        <div
          className={`shadow-2xl origin-top absolute p-6 opacity-0 rounded-xl min-w-64 bg-background text-foreground transition-[opacity] border scale-100 ${isDropdownOpen ? "opacity-100" : ""}  block`}
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
}
