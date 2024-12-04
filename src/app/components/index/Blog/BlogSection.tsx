// components/BlogSection.jsx

import React from "react";
import BlogCollection from "./BlogCollection";
import { client } from "@/app/lib/sanityClient";

export default async function BlogSection() {
  // Initialize Sanity client

  // Fetch blogs from Sanity
  const blogs = await client.fetch(`*[_type == "blog"]{
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

  return (
    <section className="px-4 sm:px-16 max-w-[1600px] mx-auto py-24">
      <div className="text-center mb-24">
        <h1 className="text-mintGreen-light text-lg">Immobilien-Ratgeber</h1>
        <p className="text-4xl sm:text-5xl mb-8 leading-tight break-words hyphens-auto">
          Dein Wissensvorsprung rund um Immobilien
        </p>
        <p className="text-lg max-w-4xl mx-auto">
          Hier findest du alles, was du über Immobilien wissen musst: Tipps,
          Artikel und Expertenwissen, die dir helfen, beim Kauf, Verkauf oder
          Vermieten immer die richtige Entscheidung zu treffen.
        </p>
      </div>
      {/* Pass the blogs data to BlogCollection */}
      <BlogCollection blogs={blogs} />
    </section>
  );
}
