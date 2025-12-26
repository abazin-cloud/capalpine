import { Calendar } from "lucide-react";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'event',
  title: 'Événements',
  type: 'document',
  icon: Calendar,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Description courte',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Texte alternatif',
          type: 'string'
        }),
        defineField({
          name: 'caption',
          title: 'Légende',
          type: 'string'
        }),
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Date et heure de début',
      type: 'datetime',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'Date et heure de fin',
      type: 'datetime',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Nom du lieu',
          type: 'string',
          validation: rule => rule.required()
        }),
        defineField({
          name: 'address',
          title: 'Adresse',
          type: 'string',
          validation: rule => rule.required()
        }),
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'capacity',
      title: 'Capacité (nombre de places)',
      type: 'number',
      validation: rule => rule.required().min(1)
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Inscriptions ouvertes',
      type: 'boolean',
      initialValue: false,
      description: 'Cocher si les inscriptions sont ouvertes pour cet événement'
    }),
    defineField({
      name: 'registrationButtonText',
      title: 'Texte du bouton d\'inscription',
      type: 'string',
      initialValue: 'S\'inscrire',
      hidden: ({ parent }) => !parent?.registrationOpen
    }),
    defineField({
      name: 'closedButtonText',
      title: 'Texte du bouton (inscriptions fermées)',
      type: 'string',
      initialValue: 'Inscriptions fermées'
    }),
    defineField({
      name: 'content',
      title: 'Contenu détaillé',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'callToActionObject' },
        { type: 'singleImageObject' },
        { type: 'videoObject' }
      ],
    }),
    defineField({
      name: "seo",
      title: 'SEO',
      type: "seoObject",
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      location: 'location.name',
      media: 'image'
    },
    prepare({ title, startDate, location, media }) {
      const date = startDate ? new Date(startDate).toLocaleDateString('fr-FR') : 'Date non définie';
      return {
        title: title || 'Sans titre',
        subtitle: `${date}${location ? ` - ${location}` : ''}`,
        media
      }
    }
  }
})

