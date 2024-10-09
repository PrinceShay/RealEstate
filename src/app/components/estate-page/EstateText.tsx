import { FullEstate } from "@/app/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity"; // Use PortableText from next-sanity
import React from "react";
import { urlFor } from "@/sanity/lib/image";

export default function EstateText({ estate }: { estate: FullEstate }) {
  const textComponents = {
    block: {
      normal: ({ children }: any) => (
        <p className="opacity-80 mb-6">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-5 mb-6">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal pl-5 mb-6">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
      number: ({ children }: any) => <li className="mb-2">{children}</li>,
    },
  };

  const floorPlan = estate.floorPlan[0]?.asset;
  return (
    <section className="my-24">
      <div className="mb-16">
        <h1 className="text-2xl font-bold mb-6">Beschreibung</h1>
        <PortableText value={estate.description} components={textComponents} />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Grundriss</h1>
        <Image
          src={urlFor(floorPlan).url()}
          alt="Grundriss"
          width={512}
          height={512}
          className="rounded-xl"
        />
      </div>
      <div className="mt-16">
        <h1 className="text-2xl font-bold mb-6">Lage</h1>
        <PortableText value={estate.location} components={textComponents} />
      </div>
    </section>
  );
}
