import { defineField, defineType } from "sanity";
import { CheckCircle } from "lucide-react";

export default defineType({
  name: 'benefitItemObject',
  title: 'Avantage',
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
      description: 'Nom de l\'icône Lucide (optionnel)',
      options: {
        list: [
          { title: 'Check', value: 'CheckCircle' },
          { title: 'Star', value: 'Star' },
          { title: 'Gift', value: 'Gift' },
          { title: 'Users', value: 'Users' },
          { title: 'Calendar', value: 'Calendar' },
          { title: 'Award', value: 'Award' },
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
        media: CheckCircle
      }
    }
  },
})

