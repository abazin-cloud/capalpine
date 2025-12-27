import { 
  introHeroBlockQuery,
  heroBlockQuery, 
  headerBlockQuery,
  featureBlockQuery,
  featureCardsBlockQuery,
  featuresMinimalBlockQuery,
  callToActionBlockQuery,
  logoBlockQuery,
  testimonialBlockQuery,
  freeformBlockQuery,
  portableTextBlockQuery,
  blogArchiveBlockQuery,
  servicesBlockQuery,
  formBlockQuery,
  mediaBlockQuery,
} from "./blocks";

export const pageBuilder = `
  pageBuilder[] {
    ${introHeroBlockQuery},
    ${heroBlockQuery},
    ${headerBlockQuery},
    ${featureBlockQuery},
    ${featureCardsBlockQuery},
    ${featuresMinimalBlockQuery},
    ${callToActionBlockQuery},
    ${logoBlockQuery},
    ${testimonialBlockQuery},
    ${freeformBlockQuery},
    ${portableTextBlockQuery},
    ${blogArchiveBlockQuery},
    ${servicesBlockQuery},
    ${formBlockQuery},
    ${mediaBlockQuery}
  }
`