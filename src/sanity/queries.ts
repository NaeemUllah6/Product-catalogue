import { groq } from "next-sanity";

export const productCardFields = `{
  _id,
  title,
  "slug": slug.current,
  price,
  "imageUrl": coalesce(image.asset->url, imageUrl),
  category,
}`;

export const productDetailFields = `{
  _id,
  title,
  "slug": slug.current,
  price,
  "imageUrl": coalesce(image.asset->url, imageUrl),
  category,
  availability,
  description,
}`;

export const allProductsQuery = groq`*[_type == "product" && !(_id in path('drafts.**'))] | order(price asc) ${productCardFields}`;

export const productBySlugQuery = groq`*[_type == "product" && !(_id in path('drafts.**')) && slug.current == $slug][0] ${productDetailFields}`;

export const relatedProductsQuery = groq`*[_type == "product" && !(_id in path('drafts.**')) && category == $category && slug.current != $slug][0...4] ${productCardFields}`;

export const categoryListQuery = groq`array::unique(*[_type == "product" && !(_id in path('drafts.**'))].category)`;


