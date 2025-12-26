import { defineQuery } from "next-sanity";
import { pageBuilder } from "../fragments/page-builder";

export const eventSlugsQuery = defineQuery(`*[_type == "event" && defined(slug.current)] {
  'params': { 'slug': slug.current }
}`);

export const eventsPageQuery = defineQuery(`*[_type == 'eventsPage'][0] {
  _id,
  _type,
  title,
  subtitle,
  'slug': slug.current,
  ${pageBuilder},
  "events": *[_type == 'event'] | order(startDate asc) {
    _id,
    _type,
    _createdAt,
    title,
    'slug': slug.current,
    excerpt,
    startDate,
    endDate,
    location {
      name,
      address
    },
    capacity,
    registrationOpen,
    registrationButtonText,
    closedButtonText,
    image { 
      asset->{ url }, 
      altText,
      caption
    },
  },
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description, subtitle, ""),
    "noIndex": seo.noIndex == true,
    "image": seo.image,
  },
}`);

export const allEventsQuery = defineQuery(`*[_type == 'event'] | order(startDate asc) {
  _id,
  _type,
  _createdAt,
  title,
  'slug': slug.current,
  excerpt,
  startDate,
  endDate,
  location {
    name,
    address
  },
  capacity,
  registrationOpen,
  registrationButtonText,
  closedButtonText,
  image { 
    asset->{ url }, 
    altText,
    caption
  },
}`);

export const eventBySlugQuery = defineQuery(`*[_type == 'event' && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  title,
  'slug': slug.current,
  excerpt,
  startDate,
  endDate,
  location {
    name,
    address
  },
  capacity,
  registrationOpen,
  registrationButtonText,
  closedButtonText,
  image { 
    asset->{ url }, 
    altText,
    caption
  },
  content[],
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description, excerpt, ""),
    "noIndex": seo.noIndex == true,
    "image": seo.image,
  },
}`);

