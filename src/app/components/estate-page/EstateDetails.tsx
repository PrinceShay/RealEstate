import { FullEstate } from "@/app/lib/interface";
import {
  Calendar,
  DoorClosed,
  Hammer,
  House,
  LandPlot,
  MapPin,
  Maximize2,
} from "lucide-react";
import React from "react";

export default function EstateDetails({ estate }: { estate: FullEstate }) {
  return (
    <section className=" ">
      {estate.features && estate.features.length > 0 ? (
        <div className="flex gap-2">
          {estate.features.map((feature) => (
            <div
              key={feature._id}
              className="flex items-center gap-2 px-4 py-2 bg-gray-lighter dark:bg-gray-darker rounded-full"
            >
              {feature.name || "untitled"}
            </div>
          ))}
        </div>
      ) : null}
      <ul className="grid grid-cols-3 gap-12 grid-flow-row mt-12 text-lg">
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <Maximize2 size={48} />
          Wohnfläche: {estate.area} m²
        </li>
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <LandPlot size={48} />
          Grundstück: {estate.plotSize}
        </li>
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <House size={48} />
          Typ: {estate.estateType.name}
        </li>
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <MapPin size={48} />
          Adresse: {estate.address}
        </li>
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <Hammer size={48} />
          Baujahr: 2015
        </li>
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <DoorClosed size={48} />
          Zimmer: {estate.rooms}
        </li>
        <li className="flex flex-col items-center text-center gap-2 justify-center">
          <Calendar size={48} />
          Bezugsfrei: 01.12.2024
        </li>
      </ul>
    </section>
  );
}
