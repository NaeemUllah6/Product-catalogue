import { sanityClient } from "@/sanity/client";
import { allProductsQuery, categoryListQuery } from "@/sanity/queries";
import HomePage from '@/app/components/home'

type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  imageUrl?: string;
  category?: string;
};

async function getData() {
  const [products, categories] = await Promise.all([
    sanityClient.fetch<Product[]>(allProductsQuery),
    sanityClient.fetch<string[]>(categoryListQuery),
  ]);
  return { products, categories };
}

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {


  return (
    <>
      <HomePage />
    </>
  );
}
