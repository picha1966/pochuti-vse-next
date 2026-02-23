import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Категорія',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'string',
      validation: (Rule) => Rule.required().error("Назва обов'язкова"),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug обов'язковий"),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Порядок сортування',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'За порядком',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
