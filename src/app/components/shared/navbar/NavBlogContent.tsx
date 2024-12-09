import { client } from "@/app/lib/sanityClient";
import React from "react";
import { Blog } from "@/app/types";
import Link from "next/link";

const blogs = await client.fetch(`*[_type == "blog"][0...3]{
  _id,
  title,
  slug,
  publishedAt,
}`);

export default function NavBlogContent() {
  return (
    <div className=" min-w-72 text-gray-darkest dark:text-gray-lightest">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg mb-6">Blogbeiträge</h1>
        {blogs.map((blog: Blog, _id: string) => (
          // <BlogItem key={_id} blog={blog} />
          <Link
            className="p-2 hover:bg-gray-lightest dark:hover:bg-gray-darker rounded-lg"
            href={`/${blog.slug.current}`}
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
