// components/BlogItem.tsx

import React from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityClient";
import { Blog, Tag } from "@/app/types";
import { toast } from "@/hooks/use-toast";

type Props = {
  blog: Blog;
};

export default function BlogItem({ blog }: Props) {
  return (
    <div
      onClick={() => {
        toast({
          title: "Ich bin nur eine Preview :(",
          description:
            "Kontaktier mich noch heute um deine Webseite zu realisieren",
        });
      }}
      className="group cursor-pointer"
      // href={`/${blog.slug.current}`}
    >
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group-hover:scale-95 transition-transform ease-inOut duration-500">
        <div className="w-full h-full relative z-20 flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-gray-darkest dark:to-gray-darker text-gray-lightest">
          <div className="flex gap-2 mb-2 flex-nowrap overflow-auto">
            {blog.tags &&
              blog.tags.map((tag: Tag) => (
                <div
                  key={tag._id}
                  className="rounded-full text-nowrap text-sm border border-mintGreen-light text-mintGreen-light px-3 py-1 group-hover:bg-mintGreen-light group-hover:text-gray-darkest transition-colors ease-inOut duration-500"
                >
                  {tag.title}
                </div>
              ))}
          </div>
          <h1 className="text-2xl mb-4">{blog.title}</h1>
          <p className="line-clamp-2 text-gray-light">
            {blog.content &&
              blog.content[0] &&
              blog.content[0].children[0].text}
          </p>
        </div>
        {blog.titleImage && (
          <Image
            className="object-cover group-hover:scale-125 transition-transform ease-inOut duration-500"
            fill
            sizes="70vw"
            alt={blog.title}
            src={urlFor(blog.titleImage).url()}
          />
        )}
      </div>
    </div>
  );
}
