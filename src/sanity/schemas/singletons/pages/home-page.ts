import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";
import { pageReferenceTypes } from "../../misc/page-reference-types";

export default defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  icon: Home,
  fieldsets: [...fieldsets],
  groups: [...fieldGroups],
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Section Hero',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre principal',
          type: 'string',
          validation: rule => rule.required(),
          initialValue: 'Cap Alpine'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: rule => rule.required(),
          description: '1-2 lignes de description'
        }),
        defineField({
          name: 'primaryCTA',
          title: 'Bouton principal',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Comment adhérer'
            }),
            defineField({
              name: 'href',
              title: 'Lien',
              type: 'reference',
              to: [...pageReferenceTypes],
            }),
          ],
        }),
        defineField({
          name: 'secondaryCTA',
          title: 'Bouton secondaire',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Nos événements'
            }),
            defineField({
              name: 'href',
              title: 'Lien',
              type: 'reference',
              to: [...pageReferenceTypes],
            }),
          ],
        }),
        defineField({
          name: 'heroImage',
          title: 'Image hero',
          type: 'image',
          fields: [
            defineField({
              name: 'altText',
              title: 'Texte alternatif',
              type: 'string'
            }),
          ],
        }),
      ],
    }),

    // Spirit Section
    defineField({
      name: 'spirit',
      title: 'L\'esprit Cap Alpine',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Titre de section',
          type: 'string',
          initialValue: 'L\'esprit Cap Alpine'
        }),
        defineField({
          name: 'body',
          title: 'Texte d\'introduction',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'values',
          title: 'Valeurs',
          type: 'array',
          of: [{ type: 'valueItemObject' }],
          validation: rule => rule.max(3)
        }),
      ],
    }),

    // Membership Benefits Section
    defineField({
      name: 'membershipBenefits',
      title: 'Pourquoi adhérer ?',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Titre de section',
          type: 'string',
          initialValue: 'Pourquoi adhérer ?'
        }),
        defineField({
          name: 'benefits',
          title: 'Avantages',
          type: 'array',
          of: [{ type: 'benefitItemObject' }],
          validation: rule => rule.min(3).max(4)
        }),
        defineField({
          name: 'optionalCTA',
          title: 'Bouton CTA (optionnel)',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Lien',
              type: 'reference',
              to: [...pageReferenceTypes],
            }),
          ],
        }),
      ],
    }),

    // Partners Section
    defineField({
      name: 'partners',
      title: 'Nos partenaires',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Titre de section',
          type: 'string',
          initialValue: 'Nos partenaires'
        }),
        defineField({
          name: 'intro',
          title: 'Introduction',
          type: 'text',
          rows: 2,
          description: 'Une phrase d\'introduction'
        }),
        defineField({
          name: 'partnersList',
          title: 'Liste des partenaires',
          type: 'array',
          of: [{ type: 'partnerObject' }],
        }),
      ],
    }),

    // Events Section
    defineField({
      name: 'events',
      title: 'Derniers événements',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Titre de section',
          type: 'string',
          initialValue: 'Derniers événements'
        }),
        defineField({
          name: 'intro',
          title: 'Introduction',
          type: 'text',
          rows: 2,
          description: 'Texte d\'introduction (optionnel)'
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Label du bouton "Voir tous"',
          type: 'string',
          initialValue: 'Voir tous les événements'
        }),
      ],
      description: 'Les événements sont automatiquement récupérés depuis les documents "Événements". Les 3 plus récents ou prochains seront affichés.'
    }),

    // Final CTA Section
    defineField({
      name: 'finalCTA',
      title: 'CTA final',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'button',
          title: 'Bouton',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Lien',
              type: 'reference',
              to: [...pageReferenceTypes],
            }),
          ],
        }),
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: 'SEO',
      type: "seoObject",
      group: 'seo'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Page d\'accueil',
      }
    },
  },
})

