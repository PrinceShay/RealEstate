import { FullEstate } from "@/app/lib/interface";
import React from "react";
import EstateDetails from "./EstateDetails";
import EstateText from "./EstateText";

export default function EstateContent({ estate }: { estate: FullEstate }) {
  return (
    <div className="col-span-2">
      <EstateDetails estate={estate} />
      <EstateText estate={estate} />
    </div>
  );
}
