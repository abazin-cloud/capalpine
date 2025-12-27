import { Info } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'introHeroBlock',
  title: 'Introduction Hero',
  type: 'object',
  icon: Info,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Titre',
      type: 'string',
      initialValue: 'Cap Alpine',
    }),
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 4,
      description: 'Texte d\'introduction présentant l\'association',
    }),
    defineField({
      name: 'buttons',
      title: 'Boutons',
      type: 'array',
      of: [{ type: 'buttonObject' }],
      validation: rule => rule.max(2).error('Maximum 2 boutons autorisés'),
    }),
    defineField({
      name: 'heroImage',
      title: 'Image Hero Banner',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Texte alternatif',
          type: 'string'
        }),
        defineField({
          title: "Hauteur",
          name: "height",
          type: "string",
          options: {
            list: [
              { title: "Petite (400px)", value: "small" },
              { title: "Moyenne (500px)", value: "medium" },
              { title: "Grande (600px)", value: "large" },
            ],
          },
          initialValue: 'medium',
        }),
      ],
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'heroImage',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Introduction Hero',
        media: Info,
      }
    },
  },
})

