"use client";

import React from "react";
import BlogItem from "./BlogItem";
import { Blog } from "@/app/types";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  blogs: Blog[];
};

export default function BlogCollection({ blogs }: Props) {
  return (
    <Swiper
      spaceBetween={32}
      slidesPerView={3}
      breakpoints={{
        // Ab einer Bildschirmbreite von 0px bis <640px (Mobile)
        0: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        // Ab 640px (Tablet/Desktop)
        640: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
    >
      {blogs.map((blog: Blog) => (
        <SwiperSlide key={blog._id}>
          <BlogItem blog={blog} />
        </SwiperSlide>
      ))}

      <SwiperSlide>
        <Link className="group" href={`/wissen`}>
          <div className="relative bg-mintGreen-light aspect-[3/4] w-full rounded-2xl overflow-hidden group-hover:scale-95 transition-transform ease-inOut duration-500">
            <div className="w-full h-full relative z-20 flex flex-col items-start justify-end p-6 bg-gradient-to-b from-transparent to-gray-darkest dark:to-gray-darker text-gray-lightest">
              <h1 className="text-2xl mb-4">Neugierig auf mehr?</h1>
              <p className="text-gray-light mb-6">
                Entdecke weitere hilfreiche Tipps und spannende Artikel rund um
                Immobilien.
              </p>
              <div className="px-4 py-2 group-hover:text-gray-darkest group-hover:bg-mintGreen-light transition-color ease-inOut duration-500 border-mintGreen-light border rounded-full flex items-center justify-center">
                Alle Beiträge anzeigen <ArrowUpRight />
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
