// src/services/estateService.ts
import { FullEstate } from '../lib/interface';
import { client as sanityClient } from '@/sanity/lib/client'

/**
 * Fetches a single real estate document by its slug.
 * @param slug - The slug of the real estate item to fetch.
 * @returns A promise that resolves to a FullEstate object or null if not found.
 */
export async function fetchEstateBySlug(slug: string): Promise<FullEstate | null> {
  const query = `*[_type == "realEstate" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug {
      current
    },
    gallery[]{
      _key,
      asset->{
        _id,
        url
      },
      caption,
      hotspot
    },
    price,
    estateType->{
      _id,
      name
    },
    features[]->{
      _id,
      name
    },
    area,
    rooms,
    plotSize,
    address,
    place->{
      _id,
      name
    },
    description[]{
      _key,
      _type,
      children[]{
        _key,
        _type,
        text,
        marks
      },
      markDefs,
      style
    },
    location[]{
      _key,
      _type,
      children[]{
        _key,
        _type,
        text,
        marks
      },
      markDefs,
      style
    },
    floorPlan[]{
      _key,
      asset->{
        _id,
        url
      }
    },
    agent->{
      _id,
      name,
      profileImage
    },
    _createdAt,
    _updatedAt
  }`;

  const params = { slug };

  try {
    const estate: FullEstate = await sanityClient.fetch(query, params);
    return estate || null;
  } catch (error) {
    console.error(`Error fetching estate with slug "${slug}":`, error);
    return null;
  }
}
