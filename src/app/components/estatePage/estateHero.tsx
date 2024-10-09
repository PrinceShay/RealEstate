"use client";
import { FullEstate } from "@/app/lib/interface";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Camera } from "lucide-react";

export default function EstateHero({ estate }: { estate: FullEstate }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const firstImage = estate.gallery[0]?.asset;
  const priceNumber = estate.price.toLocaleString(undefined);
  const imageCount = estate.gallery.length;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageCount - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageCount - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <header>
      <div className="w-full aspect-video rounded-2xl relative overflow-clip flex flex-col justify-end items-start p-6">
        <Image
          alt={estate.title}
          src={urlFor(firstImage).url()}
          fill
          className="w-full h-full absolute object-cover"
        />
        {imageCount > 1 ? (
          <div
            onClick={() => openLightbox(0)}
            className="relative flex items-center gap-2 bg-gray-lightest dark:text-gray-lightest dark:bg-gray-darker p-5 rounded-xl cursor-pointer hover:bg-gray-lighter dark:hover:bg-gray-dark transition-colors ease-out"
          >
            <Camera /> Alle {imageCount} Bilder ansehen
          </div>
        ) : null}
      </div>
      <div className="my-6">
        <h1 className="text-3xl">{estate.title}</h1>
        <div className="flex gap-12 mt-4 border-b pb-8 border-gray-dark dark:border-gray-light">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{priceNumber} €</div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Kaufpreis
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{estate.rooms}</div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Zimmer
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{estate.area} m²</div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Wohnfläche
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{estate.plotSize} m²</div>
            <div className="text-sm text-gray-dark dark:text-gray-light opacity-80">
              Grundstück
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            {/* Schließen-Button */}
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={closeLightbox}
            >
              &times;
            </button>

            {/* Vorheriger-Button */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl"
              onClick={showPrevImage}
            >
              &#10094;
            </button>

            {/* Nächster-Button */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-5xl"
              onClick={showNextImage}
            >
              &#10095;
            </button>

            {/* Hauptbild */}
            <div className="flex-1 flex items-center justify-center">
              <Image
                alt={`${estate.title} - Bild ${currentImageIndex + 1}`}
                src={urlFor(estate.gallery[currentImageIndex]?.asset).url()}
                width={1600}
                height={900}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Vorschaubilder */}
            <div className="mt-4 flex space-x-2 overflow-x-auto">
              {estate.gallery.map((item, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 ${
                    index === currentImageIndex
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    alt={`${estate.title} - Vorschaubild ${index + 1}`}
                    src={urlFor(item.asset).url()}
                    width={100}
                    height={75}
                    className="object-cover w-24 h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
