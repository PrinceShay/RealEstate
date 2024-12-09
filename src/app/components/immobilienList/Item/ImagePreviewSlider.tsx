"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityClient";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GalleryImage } from "@/app/lib/interface"; // Importiere den Typ

type Estate = {
  gallery: GalleryImage[];
  title: string;
};

type ImagePreviewSliderProps = {
  estate: Estate;
};

export default function ImagePreviewSlider({
  estate,
}: ImagePreviewSliderProps) {
  return (
    <Swiper
      // Installiere Swiper-Module
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ type: "fraction", clickable: true }}
      loop
      className="w-full h-full"
    >
      {estate.gallery.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              alt={`${estate.title} - Bild ${index + 1}`}
              src={urlFor(item.asset).url()}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
