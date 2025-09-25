import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/queries";
import ProductCard from "@/common/components/product-card";
import Button from "@/common/components/button";

type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  imageUrl?: string;
  category?: string;
  availability?: boolean;
  description?: string;
};

async function getData(slug: string) {
  const product = await sanityClient.fetch<Product | null>(productBySlugQuery, { slug });
  if (!product) return { product: null, related: [] as Product[] };
  const related = await sanityClient.fetch<Product[]>(relatedProductsQuery, {
    slug: product.slug,
    category: product.category,
  });
  return { product, related: related.slice(0, 3) };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { product, related } = await getData(slug);
  if (!product) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p>Product not found.</p>
        <Link href="/" className="text-blue-600 underline">Go back</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] ">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.title} fill className="object-cover rounded-3xl" />
          ) : null}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="mt-2 text-neutral-500">Category: {product.category}</div>
          <div className="mt-2 text-lg font-semibold">${product.price?.toFixed(2)}</div>
          <div className="mt-1">{product.availability ? "In stock" : "Out of stock"}</div>
          <p className="mt-4 text-neutral-700 whitespace-pre-line">{product.description}</p>
          <div className="mt-6">
            <Link className="" href={`/cart?slug=${product.slug}`}>
              <Button className="bg-white !text-black hover:!text-white">Add to cart</Button>
            </Link>
          </div>
        </div>
      </div>

      {related?.length ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}


