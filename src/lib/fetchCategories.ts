// lib/fetchCategories.js
import { client } from '../sanity/lib/client'

export async function getCategories() {
  const query = `*[_type == "category"] { 
    _id,
    title,
    "slug": slug.current,
    description
  }`
  const categories = await client.fetch(query)
  return categories
}
