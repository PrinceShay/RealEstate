import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,      
  apiVersion: '2024-09-09',                             
  useCdn: true,                                         
});


// Image URL Builder
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}