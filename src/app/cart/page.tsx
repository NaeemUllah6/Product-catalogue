import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { productBySlugQuery } from "@/sanity/queries";
import Image from "next/image";

type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  imageUrl?: string;
};

export default async function CartPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const { slug } = await searchParams;
  let product: Product | null = null;
  if (slug) {
    product = await sanityClient.fetch<Product | null>(productBySlugQuery, { slug });
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>
      {product ? (
        <div className="flex items-center gap-4 border rounded-lg p-4">
          <div className="relative w-24 h-18 bg-neutral-100">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
            ) : null}
          </div>
          <div className="flex-1">
            <div className="font-medium">{product.title}</div>
            <div className="text-neutral-600">${product.price?.toFixed(2)}</div>
          </div>
          <Link href={`/product/${product.slug}`} className="text-blue-600 underline">View</Link>
        </div>
      ) : (
        <p>No items yet. Go add something.</p>
      )}
    </main>
  );
}


