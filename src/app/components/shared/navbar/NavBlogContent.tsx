import { client } from "@/app/lib/sanityClient";
import React from "react";
import BlogItem from "../../index/Blog/BlogItem";
import { Blog } from "@/app/types";

const blogs = await client.fetch(`*[_type == "blog"][0...3]{
  _id,
  title,
  slug,
  titleImage,
  tags[]->{
    _id,
    title
  },
  publishedAt,
  author->{
    name
  },
  content
}`);

export default function NavBlogContent() {
  return (
    <div className="flex gap-2">
      {blogs.map((blog: Blog) => (
        <BlogItem blog={blog} />
      ))}
    </div>
  );
}
