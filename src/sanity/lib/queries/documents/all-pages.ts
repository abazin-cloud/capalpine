import { defineQuery } from "next-sanity";

/**
 * Query pour récupérer toutes les pages du site
 */
export const allPagesQuery = defineQuery(`*[_type == "page"] | order(title asc) {
  _id,
  _type,
  title,
  'slug': slug.current,
}`);

