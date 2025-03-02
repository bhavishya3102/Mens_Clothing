import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cloths')
    .items([
      S.documentTypeListItem('product').title('products'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('brand').title('Brands'),
      S.documentTypeListItem('banner').title('Banners'),
      S.documentTypeListItem('specialoffers').title('Special Offers'),
      // S.documentTypeListItem('company').title('Companies'),
      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product', 'category', 'brand','banner','specialoffers'].includes(item.getId()!),
      ),
    ])
