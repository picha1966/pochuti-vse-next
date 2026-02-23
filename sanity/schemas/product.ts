import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Товар',
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
      name: 'brand',
      title: 'Бренд',
      type: 'string',
      initialValue: 'Signia',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Короткий опис (2–3 речення)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Повний опис',
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
          },
        },
      ],
    }),
    defineField({
      name: 'priceFrom',
      title: 'Ціна від (грн)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).error("Ціна обов'язкова"),
    }),
    defineField({
      name: 'priceNote',
      title: 'Примітка до ціни',
      type: 'string',
      initialValue: 'Точна вартість визначається після діагностики слуху',
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'images',
      title: 'Фото товару',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt текст',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).warning('Рекомендується додати хоча б одне фото'),
    }),
    defineField({
      name: 'features',
      title: 'Особливості (список)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'specs',
      title: 'Технічні характеристики',
      type: 'object',
      fields: [
        { name: 'type', title: 'Тип апарату', type: 'string' },
        { name: 'channels', title: 'Кількість каналів', type: 'string' },
        { name: 'hearingLoss', title: 'Ступінь втрати слуху', type: 'string' },
        { name: 'battery', title: 'Батарея', type: 'string' },
        { name: 'warranty', title: 'Гарантія', type: 'string', initialValue: '1 рік' },
      ],
    }),
    defineField({
      name: 'isAccessory',
      title: 'Це аксесуар',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Активний (показувати на сайті)',
      type: 'boolean',
      initialValue: true,
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
    { title: 'За назвою', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'brand',
    },
  },
});
