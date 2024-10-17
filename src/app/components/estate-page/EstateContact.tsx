import React from "react";
import { FullEstate } from "@/app/lib/interface";
import PrimaryButton from "../shared/ui/PrimaryButton";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function EstateContact({ estate }: { estate: FullEstate }) {
  const profileImage = estate.agent.profileImage;
  return (
    <div>
      <aside className="sticky top-48 flex flex-col items-center place-self-end gap-8 bg-gray-lightest dark:bg-gray-darker p-12 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={urlFor(profileImage).url()}
            alt={estate.agent.name}
            width={512}
            height={512}
            className="rounded-full aspect-square object-cover w-48"
          />
          <div className="text-center">
            <h1 className="text-xl font-semibold">{estate.agent.name}</h1>
            <p className="text-gray-dark opacity-85">Immobilienmakler</p>
          </div>
        </div>
        <PrimaryButton title="Kontaktieren" link="/" />
      </aside>
    </div>
  );
}
