import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'


export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [

    defineField({
      name: 'brandName',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'brandName',
      },
    }),

   
    defineField({
      name: 'brandImage',
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
  
  ],
  preview: {
    select: {
      title: 'brandName',
     
      media: 'brandImage',
    },

    prepare(selection) {
 return selection
    },

  },
})
