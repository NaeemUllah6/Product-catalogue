import Image from "next/image";
import Link from "next/link";
import { getProductById, getRelatedByCategory } from "@/lib/mock-products";

type Params = { id: string };

export default async function ProductDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const numericId = Number(id);
  const product = getProductById(numericId);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Product not found.</p>
        <Link href="/" className="text-blue-600 underline">Back to products</Link>
      </main>
    );
  }

  const related = getRelatedByCategory(product.category, product.id, 3);

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[4/3] bg-neutral-100">
          <Image src={product.image} alt={product.title} fill className="object-cover rounded-2xl" unoptimized />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="mt-2 text-white">Category: {product.category}</div>
          <div className="mt-2 text-lg font-semibold">€{product.price.toFixed(2)}</div>
          <p className="mt-4 text-white">This is a demo description for {product.title}. Replace with CMS content later.</p>
        </div>
      </div>

      {related.length ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group block border border-neutral-200 rounded-lg overflow-hidden hover:shadow-sm">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-3">
                  <div className="text-sm text-white">{p.category}</div>
                  <div className="font-medium truncate">{p.title}</div>
                  <div className="mt-1 font-semibold">€{p.price.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}


