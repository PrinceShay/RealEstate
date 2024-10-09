"use client";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type Props = {
  title: string;
  text: string;
};

export default function FaqItem({ title, text }: Props) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="rounded-xl bg-white dark:bg-gray-darker dark:bg-gunMetal-500 shadow-2xl group p-6 cursor-pointer ">
      <div
        className="flex items-center justify-between w-full text-xl group-hover:text-mintGreen-light"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
        tabIndex={0}
        aria-expanded={open}
        role="button"
      >
        {title}
        <ChevronDown
          className={`transform  transition-transform duration-300 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: open ? `${height}px` : "0px" }}
      >
        <p className="mt-4 opacity-75">{text}</p>
      </div>
    </div>
  );
}
