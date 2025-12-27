import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

export default defineType({
  name: 'partnerObject',
  title: 'Partner',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du partenaire',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Texte alternatif',
          type: 'string'
        }),
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'href',
      title: 'URL du site web',
      type: 'url',
      description: 'Lien vers le site web du partenaire (optionnel)'
    }),
    defineField({
      name: 'tier',
      title: 'Niveau de partenariat',
      type: 'string',
      options: {
        list: [
          { title: 'Principal', value: 'primary' },
          { title: 'Secondaire', value: 'secondary' },
          { title: 'Supporter', value: 'supporter' },
        ],
      },
      initialValue: 'secondary'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      logo: 'logo',
      tier: 'tier'
    },
    prepare({ title, logo, tier }) {
      return {
        title: title || 'Sans nom',
        subtitle: tier ? `Niveau: ${tier}` : 'Partenaire',
        media: logo?.asset ? logo : Building2
      }
    }
  },
})

