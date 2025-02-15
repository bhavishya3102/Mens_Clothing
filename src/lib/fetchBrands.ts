// lib/fetchCategories.js
import { client } from '../sanity/lib/client'

export async function getBrands() {
  const query = `*[_type == "brand"] { 
    _id,
    brandName,
    brandImage

  }`
  const brands = await client.fetch(query)
  return brands
}