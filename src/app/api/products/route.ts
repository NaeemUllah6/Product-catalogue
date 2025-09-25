import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const q = `*[_type == "product" && !(_id in path('drafts.**'))] | order(price asc){
      _id,
      title,
      "slug": slug.current,
      price,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      category
    }`;
    const products = await sanityClient.fetch(q);
    return NextResponse.json({ products });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to fetch" }, { status: 500 });
  }
}


