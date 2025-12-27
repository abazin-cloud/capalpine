import { defineField, defineType } from "sanity";
import { Heart } from "lucide-react";

export default defineType({
  name: 'valueItemObject',
  title: 'Valeur',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Nom de l\'icône Lucide (optionnel, ex: "Heart", "Users", "Sparkles")',
      options: {
        list: [
          { title: 'Cœur', value: 'Heart' },
          { title: 'Utilisateurs', value: 'Users' },
          { title: 'Étincelles', value: 'Sparkles' },
          { title: 'Montagne', value: 'Mountain' },
          { title: 'Route', value: 'Route' },
          { title: 'Trophy', value: 'Trophy' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      icon: 'icon'
    },
    prepare({ title, description, icon }) {
      return {
        title: title || 'Sans titre',
        subtitle: description ? description.substring(0, 50) + '...' : '',
        media: Heart
      }
    }
  },
})

