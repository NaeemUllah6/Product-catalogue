import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const query = `*[_type == "product" && !(_id in path('drafts.**'))] | order(price asc){
      _id,
      title,
      "slug": slug.current,
      price,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      category
    }`;

    const products = await sanityClient.fetch(query);

    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
