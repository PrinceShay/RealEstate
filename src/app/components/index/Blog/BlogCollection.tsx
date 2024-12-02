// components/BlogCollection.tsx

"use client"; // This marks the component as a client component

import React from "react";
import BlogItem from "./BlogItem";
import { Blog } from "@/app/types";

type Props = {
  blogs: Blog[];
};

export default function BlogCollection({ blogs }: Props) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {blogs.map((blog: Blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
