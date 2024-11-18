"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import EstateItem from "./EstateItem";
import { EstateCard } from "@/app/lib/interface";

// Props-Typen definieren
interface ObjectsSliderProps {
  estates: EstateCard[];
}

export default function ObjectsSlider({ estates }: ObjectsSliderProps) {
  return (
    <Swiper spaceBetween={16} slidesPerView={1.15} centeredSlides loop>
      {estates.map((estate) => (
        <SwiperSlide key={estate.slug}>
          <EstateItem estate={estate} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
