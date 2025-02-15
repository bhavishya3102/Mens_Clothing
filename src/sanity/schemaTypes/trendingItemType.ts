import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const trendingItemType = defineType({
  name: 'trendingItem',
  title: 'TrendingItem',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'ProductName',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'ProductImage',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
        name: 'tagline',
        title: 'Tagline',
        type: 'text',
      }),
   
  ],
  preview: {
    select: {
      title: 'ProductName',
      media: 'ProductImage',    
    },
  },
})
