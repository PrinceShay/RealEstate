import React, { useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Heart, MapPin, Share } from "lucide-react";
import { GalleryImage } from "@/app/lib/interface";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ImagePreviewSlider from "./ImagePreviewSlider";

type Feature = {
  name: string;
};

type Estate = {
  slug: { current: string };
  _createdAt: string;
  price: number;
  gallery: GalleryImage[];
  firstImage?: GalleryImage; // Ensure firstImage is included if it's separate
  title: string;
  place: { name: string };
  description: any; // Replace 'any' with the correct type if needed
  features?: Feature[];
  area: number;
  rooms: number;
};

type EstateItemListProps = {
  estate: Estate;
  layout?: "vertical" | "horizontal";
};

export default function EstateItemList({
  estate,
  layout = "vertical",
}: EstateItemListProps) {
  const components = {};
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = JSON.parse(
        localStorage.getItem("savedEstates") || "[]"
      );
      const isItemSaved = savedItems.some(
        (item: any) => item.slug.current === estate.slug.current
      );
      setIsSaved(isItemSaved);
    }
  }, [estate.slug.current]);

  const isNew = React.useMemo(() => {
    const createdAtDate = new Date(estate._createdAt);
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    return createdAtDate > oneMonthAgo;
  }, [estate._createdAt]);

  const formattedNumber = estate.price.toLocaleString("de-DE");

  const toggleSave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      let savedItems = JSON.parse(localStorage.getItem("savedEstates") || "[]");
      if (isSaved) {
        savedItems = savedItems.filter(
          (item: any) => item.slug.current !== estate.slug.current
        );
      } else {
        savedItems.push(estate);
      }
      localStorage.setItem("savedEstates", JSON.stringify(savedItems));
      setIsSaved(!isSaved);
    }
  };

  // Adjust container classes based on layout
  const containerClassNames =
    layout === "vertical" ? "flex flex-col" : "grid grid-cols-3";

  return (
    <div
      className={`w-full bg-white dark:bg-gray-darker ${containerClassNames} gap-8 p-6 group rounded-2xl`}
    >
      <div className="flex flex-col h-full gap-3">
        <Link
          href={`/immobilien/${estate.slug.current}`}
          className={`aspect-square object-cover sm:object-contain sm:aspect-video bg-gray-100 rounded-xl overflow-hidden relative w-full ${
            layout === "horizontal" ? "h-full" : "h-auto"
          }`}
        >
          {layout === "horizontal" ? (
            estate.firstImage ? (
              <Image
                className="group-hover:scale-110 transition-transform duration-700 ease-out object-cover"
                src={urlFor(estate.firstImage).url()}
                alt={estate.title}
                layout="fill" // Adjust if using Next.js 13 or later
                objectFit="cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image Available
              </div>
            )
          ) : estate.gallery && estate.gallery.length > 0 ? (
            <ImagePreviewSlider estate={estate} />
          ) : estate.firstImage ? (
            <Image
              className="group-hover:scale-110 transition-transform duration-700 ease-out object-cover"
              src={urlFor(estate.firstImage).url()}
              alt={estate.title}
              layout="fill" // Adjust if using Next.js 13 or later
              objectFit="cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Images Available
            </div>
          )}
        </Link>
        <div className="flex gap-2 text-gray-dark dark:text-gray-light">
          <div onClick={toggleSave}>
            <Heart
              className={`hover:stroke-red-500 active:fill-red-500 active:stroke-red-500 active:scale-[0.85] transition-transform cursor-pointer ${
                isSaved ? "fill-red-500 stroke-red-500" : ""
              }`}
            />
          </div>
          <div>
            <Share className="hover:stroke-blue-500 active:scale-[0.85] transition-transform" />
          </div>
        </div>
      </div>
      <Link
        href={`/immobilien/${estate.slug.current}`}
        className={`${
          layout === "vertical" ? "" : "col-span-2"
        } flex flex-col items-start gap-2`}
      >
        <div className="flex gap-4">
          {isNew && (
            <div className="bg-mintGreen-light text-gray-darkest px-3 py-1 rounded-full text-sm">
              Neu
            </div>
          )}
          <div className="flex gap-1 items-center text-gray-500 dark:text-gray-400">
            <MapPin size={16} strokeWidth={2} /> {estate.place.name}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-2xl">{estate.title}</h1>
        </div>

        <div className="text-gray-dark dark:text-gray-light opacity-80 line-clamp-2 mt-4">
          <PortableText value={estate.description} components={components} />
        </div>

        <div className="flex gap-2 text-sm w-full overflow-auto">
          {estate.features
            ?.slice(0, 6)
            .map((feature: Feature, index: number) => (
              <div
                key={index}
                className="bg-gray-lightest dark:bg-gray-darkest p-2 rounded-xl"
              >
                {feature.name}
              </div>
            ))}
        </div>

        <div className="flex gap-2">
          <div>{estate.area}m²</div> | <div>{estate.rooms} Zimmer</div>
        </div>
        <p className="text-mintGreen-light dark:text-mintGreen-dark font-semibold text-2xl mt-4">
          {formattedNumber}€
        </p>
      </Link>
    </div>
  );
}
