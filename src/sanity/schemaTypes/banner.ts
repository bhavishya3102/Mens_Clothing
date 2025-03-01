import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'


export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [

    defineField({
        name: 'bannerTitle',
        type: 'string',
      }),
   
    defineField({
      name: 'bannerImage',
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
      title: 'bannerTitle',
     
      media: 'bannerImage',
    },

    prepare(selection) {
 return selection
    },

  },
})
