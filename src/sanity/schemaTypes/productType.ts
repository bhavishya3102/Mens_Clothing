import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
    }),
    defineField({
      name: 'stock',
      type: 'number',
      description: 'Number of items available in stock',
    }),
    defineField({
      name: 'inStock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metaTitle',
      type: 'string',
      description: 'Custom meta title for SEO',
    }),
    defineField({
      name: 'metaDescription',
      type: 'string',
      description: 'Custom meta description for SEO',
    }),
    defineField({
      name: 'metaKeywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Custom meta keywords for SEO',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      media: 'mainImage',
    },
    prepare(selection) {
      const { image } = selection
      return { ...selection, imageUrl: image }
    },
  },
})
