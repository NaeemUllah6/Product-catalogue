import Image from "next/image";
import Heading from "./heading";
import Link from "next/link";

export interface Product {
    id?: number | string;
    title: string;
    price: number;
    image?: string;
    imageUrl?: string;
    slug?: string;
    category?: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={product.slug ? `/product/${product.slug}` : `/products/${product.id}`}>
            <div
                className="group relativ shadow-md hover:shadow-xl 
                         transition-all overflow-hidden transform"
                aria-labelledby={`product-${product.id ?? product.slug}-title`}
            >
                <div className="relative w-full h-48 sm:h-56 lg:h-44 xl:h-60 overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 z-10"></div>
                    <Image
                        src={product.image || product.imageUrl || "/file.svg"}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        unoptimized
                    />
                </div>

                <div className="p-4 md:p-5 relative bg-white/95 backdrop-blur-sm">
                    <Heading
                        level={3}
                        id={`product-${product.id ?? product.slug}-title`}
                        className="text-base font-semibold text-gray-900 font-clash group-hover:text-black transition-colors duration-300"
                    >
                        {product.title}
                    </Heading>

                    <div className="mt-3 flex items-center justify-between">
                        <p className="text-lg font-bold text-green-600 group-hover:text-green-500 transition-colors duration-300">
                            €{product.price.toFixed(2)}
                        </p>

                        <button
                            type="button"
                            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#0f1724] text-white text-sm rounded-md 
                               hover:bg-black/90 active:scale-95 transform hover:shadow-lg 
                               transition-all duration-300 ease-in-out"
                            aria-label={`Add ${product.title} to cart`}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}