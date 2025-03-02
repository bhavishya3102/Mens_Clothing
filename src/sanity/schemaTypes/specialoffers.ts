import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'


// {
//     id: 1,
//     title: "Cotton Kurta Sale",
//     price: "₹500",
//     image: kurta,
//     tag: "Best Deal",
//   },
export const specialoffers = defineType({
  name: 'specialoffers',
  title: 'Special Offers',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'price',
      type: 'number',
    }),
    defineField({
        name: 'tag',
        title: 'Tag',
        type: 'string',
        options: {
          list: [
            { title: 'Best Deal', value: 'Best Deal' },
            { title: 'Limited Stock', value: 'Limited Stock' },
            { title: 'Trending', value: 'Trending' },
          ],
        },
      
      }),

    
    
  ],
 
})
