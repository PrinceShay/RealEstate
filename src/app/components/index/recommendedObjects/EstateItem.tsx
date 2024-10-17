import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EstateItem({ estate }: { estate: any }) {
  const formattedNumber = estate.price.toLocaleString("de-DE");
  return (
    <Link href={`/immobilien/${estate.slug.current}`}>
      <div className="group ">
        <div className="aspect-square rounded-xl overflow-hidden">
          <Image
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            src={urlFor(estate.firstImage).url()}
            width={512}
            height={512}
            alt={estate.title}
          />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <p>{estate.place.name}</p>
          <p className="text-lg min-h-16">{estate.title}</p>
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
