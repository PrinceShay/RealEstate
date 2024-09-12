import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";

function EstateItem({ estate }: { estate: any }) {
  let formattedNumber = estate.price.toLocaleString("de-DE");
  return (
    <Link href={`/immobilien/${estate.slug.current}`}>
      <div>
        <img
          className="aspect-video object-cover rounded-xl"
          src={urlFor(estate.firstImage).url()}
          alt={estate.title}
        />
        <div className="mt-5 flex flex-col gap-2">
          <p>{estate.place.name}</p>
          <p className="text-lg">{estate.title}</p>
          <div className="flex justify-between">
            <p className="text-xl">{formattedNumber} €</p>
            <p>{estate.area} m²</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EstateItem;