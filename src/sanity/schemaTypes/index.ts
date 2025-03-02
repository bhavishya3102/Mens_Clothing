import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { productType } from './productType'
import { brand } from './brand'
import { trendingItemType } from './trendingItemType'
import { banner } from './banner'
import { specialoffers } from './specialoffers'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, brand, trendingItemType, banner, specialoffers],
}
