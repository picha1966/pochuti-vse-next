import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Стаття блогу',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required().error("Заголовок обов'язковий"),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug обов'язковий"),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий анонс',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Обкладинка',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt текст',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Текст статті',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Em', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Посилання',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt текст', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'cityTarget',
      title: 'Цільове місто',
      type: 'string',
      options: {
        list: [
          { title: 'Обидва міста', value: 'both' },
          { title: 'Вінниця', value: 'vinnytsia' },
          { title: 'Хмельницький', value: 'khmelnytskyi' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Нові спочатку',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'publishedAt',
    },
  },
});
