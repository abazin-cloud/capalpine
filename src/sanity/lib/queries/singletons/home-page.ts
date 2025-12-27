import { defineQuery } from "next-sanity";

/**
 * Query pour récupérer la page d'accueil avec toutes ses sections
 * Inclut automatiquement les 3 événements les plus récents ou prochains
 */
export const homePageQuery = defineQuery(`*[_type == 'homePage'][0] {
  _id,
  _type,
  
  // Hero Section
  hero {
    title,
    description,
    primaryCTA {
      label,
      href->{
        _type,
        'slug': slug.current,
        title
      }
    },
    secondaryCTA {
      label,
      href->{
        _type,
        'slug': slug.current,
        title
      }
    },
    heroImage {
      asset->{ url },
      altText
    }
  },
  
  // Spirit Section
  spirit {
    heading,
    body,
    values[] {
      _key,
      title,
      description,
      icon
    }
  },
  
  // Membership Benefits Section
  membershipBenefits {
    heading,
    benefits[] {
      _key,
      title,
      description,
      icon
    },
    optionalCTA {
      label,
      href->{
        _type,
        'slug': slug.current,
        title
      }
    }
  },
  
  // Partners Section
  partners {
    heading,
    intro,
    partnersList[] {
      _key,
      name,
      logo {
        asset->{ url },
        altText
      },
      href,
      tier
    }
  },
  
  // Events Section
  events {
    heading,
    intro,
    ctaLabel
  },
  
  // Final CTA Section
  finalCTA {
    heading,
    description,
    button {
      label,
      href->{
        _type,
        'slug': slug.current,
        title
      }
    }
  },
  
  // SEO
  "seo": {
    "title": coalesce(seo.title, hero.title, ""),
    "description": coalesce(seo.description, hero.description, ""),
    "noIndex": seo.noIndex == true,
    "image": seo.image,
  },
}`);

/**
 * Query pour récupérer les 3 événements les plus pertinents
 * Priorité : événements à venir, puis événements récents
 */
export const homePageEventsQuery = defineQuery(`*[_type == 'event'] | order(
  startDate asc
) [0...3] {
  _id,
  _type,
  title,
  'slug': slug.current,
  excerpt,
  startDate,
  endDate,
  location {
    name,
    address
  },
  image {
    asset->{ url },
    altText,
    caption
  },
  registrationOpen
}`);

