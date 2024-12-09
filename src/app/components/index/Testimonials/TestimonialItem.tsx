import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";

type Props = {
  profileImagesrc: string;
  name: string;
  text: string;
  location: string;
};

export default function TestimonialItem({
  profileImagesrc,
  name,
  text,
  location,
}: Props) {
  return (
    <div className="w-full h-full max-h-[60vh] bg-gray-dark dark:bg-gray-dark rounded-2xl aspect-[9/16] flex flex-col gap-8 p-8 overflow-auto ">
      {/* Profile Image */}
      <div className="w-[20%] overflow-hidden aspect-square rounded-full relative">
        <Image
          src={profileImagesrc}
          fill
          className="w-full h-full object-cover"
          sizes="12rem"
          alt={name}
        />
      </div>

      {/* Text and Link */}
      <div className="mt-8">
        <div className="flex gap-1 ">
          <Star stroke="none" className="fill-yellow-500" />
          <Star stroke="none" className="fill-yellow-500" />
          <Star stroke="none" className="fill-yellow-500" />
          <Star stroke="none" className="fill-yellow-500" />
          <StarHalf stroke="none" className="fill-yellow-500" />
        </div>
        <p className="text-md sm:text-xl mt-4 mb-4">{text}</p>
        <Link className="text-lg text-mintGreen-light" href={"/"}>
          Erfolgsstory ansehen
        </Link>
      </div>

      {/* Name and Location */}
      <div className="mt-auto">
        <p className="text-2xl">{name}</p>
        <p className="text-md opacity-75">{location}</p>
      </div>
    </div>
  );
}
