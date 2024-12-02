// components/BlogItem.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanityClient";
import { Blog, Tag } from "@/app/types";

type Props = {
  blog: Blog;
};

export default function BlogItem({ blog }: Props) {
  return (
    <Link className="group" href={`/${blog.slug.current}`}>
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden group-hover:scale-95 transition-transform ease-inOut duration-500">
        <div className="w-full h-full relative z-20 flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-gray-darkest dark:to-gray-darker text-gray-lightest">
          <div className="flex gap-2 mb-2 flex-nowrap overflow-auto">
            {blog.tags &&
              blog.tags.map((tag: Tag) => (
                <div
                  key={tag._id}
                  className="rounded-full text-sm border border-mintGreen-light text-mintGreen-light px-3 py-1 group-hover:bg-mintGreen-light group-hover:text-gray-darkest transition-colors ease-inOut duration-500"
                >
                  {tag.title}
                </div>
              ))}
          </div>
          <h1 className="text-2xl mb-3">{blog.title}</h1>
          <p className="line-clamp-2 text-gray-light opacity-80">
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
    </Link>
  );
}
