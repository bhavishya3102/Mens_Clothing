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
      // S.documentTypeListItem('company').title('Companies'),
      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product', 'category', 'brand','banner'].includes(item.getId()!),
      ),
    ])
