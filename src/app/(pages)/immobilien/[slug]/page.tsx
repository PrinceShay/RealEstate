import React from "react";
import { client, urlFor } from "@/app/lib/sanityClient";
import { FullEstate } from "@/app/lib/interface";

async function getData(slug: string) {
  const query = `*[_type == "realEstate" && slug.current == $slug][0]{
      title,
      slug,
      gallery[] {
        "imageUrl": asset->url,
        caption
      },
      price,
      area,
      rooms,
      plotSize,
      address,
      place,
      description[] {
        ...
      },
      location[] {
        ...
      },
      floorPlan[] {
        "imageUrl": asset->url
      },
      agent->{
        name,
        phone,
        email
      }
    }`;
  const estate = await client.fetch(query, { slug });
  return estate;
}

export default async function page({ params }: { params: { slug: string } }) {
  const estate: FullEstate = await getData(params.slug);

  if (!estate) {
    return (
      <section className="min-h-screen pt-64 px-6 md:px-24 lg:px-48">
        <h1 className="">Beitrag nicht gefunden</h1>
      </section>
    );
  }

  return (
    <div>
      <h1>{estate.title}</h1>
    </div>
  );
}
