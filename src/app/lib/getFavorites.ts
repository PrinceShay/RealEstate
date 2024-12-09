// getFavorites.js oder getFavorites.ts
import { client } from "./sanityClient";

export async function getData() {
  const query = `*[_type == "realEstate"][0...6]{
    title,
    slug,
    "firstImage": gallery[0].asset->url,
    price,
    place->{
      name, 
    },
    area
  }`;
  const estates = await client.fetch(query);
  return estates;
}
