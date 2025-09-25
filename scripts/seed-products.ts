import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

interface Category {
  name: string;
  titles: string[];
}

interface Product {
  title: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
  imageUrl: string;
}

interface SanityDoc {
  _type: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
  slug: {
    _type: string;
    current: string;
  };
  image?: {
    _type: "image";
    asset: { _type: "reference"; _ref: string };
  };
  imageUrl?: string;
}

const categories: Category[] = [
  {
    name: "Clothing",
    titles: [
      "Knit Sweater",
      "Fleece Hoodie",
      "Denim Jacket",
      "Cotton Tee",
      "Linen Shirt",
      "Puffer Jacket",
      "Cardigan",
      "Chino Pants",
      "Track Pants",
      "Summer Shorts",
    ],
  },
  {
    name: "Accessories",
    titles: [
      "Leather Bag",
      "Sunglasses",
      "Silk Scarf",
      "Belt",
      "Wallet",
      "Backpack",
      "Cap",
      "Gloves",
      "Beanie",
      "Necklace",
    ],
  },
  {
    name: "Footwear",
    titles: [
      "Running Sneakers",
      "Casual Sneakers",
      "Leather Boots",
      "Loafers",
      "Sandals",
      "High Tops",
      "Trail Shoes",
      "Slip-ons",
      "Court Shoes",
      "Canvas Shoes",
    ],
  },
  {
    name: "Watches",
    titles: [
      "Chrono Watch",
      "Dress Watch",
      "Sport Watch",
      "Digital Watch",
      "Field Watch",
      "Diver Watch",
      "Quartz Watch",
      "Smart Watch",
      "Aviator Watch",
      "Minimal Watch",
    ],
  },
];

function buildImageQuery(title: string, category: string): string {
  const t = title.toLowerCase();
  const c = category.toLowerCase();
  if (c === "footwear") return "sneakers,shoes,footwear";
  if (c === "watches") return "wrist watch,timepiece,watch";
  if (c === "accessories") {
    if (/sunglass/.test(t)) return "sunglasses,eyewear,accessories";
    if (/bag|backpack|leather/.test(t)) return "leather bag,handbag,backpack";
    return "fashion accessories,scarf,belt,wallet";
  }
  if (/hoodie|sweater|knit/.test(t)) return "knit sweater,hoodie,clothing";
  if (/jacket|denim/.test(t)) return "denim jacket,outerwear,clothing";
  if (/shirt|tee/.test(t)) return "t-shirt,shirt,clothing";
  if (/pants|chino|track|short/.test(t)) return "clothing pants,shorts,fashion";
  return `${category},${title}`;
}

const PICSUM_IDS = [
  1001, 1002, 1003, 1004, 1005, 1011, 1012, 1015, 1016, 1018, 1020, 1021, 1023,
  1025, 1027, 1031, 1035, 1040, 1041, 1043, 1044, 1045, 1050, 1052, 1055, 1057,
  1060, 1062, 1065, 1070, 1074, 1080, 1084, 1085, 1089, 109, 110, 111, 112, 113,
  114,
];

function buildImageUrl(_title: string, _category: string, idx: number): string {
  const id = PICSUM_IDS[idx % PICSUM_IDS.length];
  return `https://picsum.photos/id/${id}/800/600`;
}

const products: Product[] = categories.flatMap((cat, ci) =>
  cat.titles.map((t, i) => {
    const basePrice = 29 + ci * 10 + i * 3;
    return {
      title: `${t}`,
      description: `High-quality ${t.toLowerCase()} for everyday use in the ${cat.name.toLowerCase()} category.`,
      category: cat.name,
      price: Math.round(basePrice * 100) / 100,
      availability: true,
      imageUrl: buildImageUrl(t, cat.name, ci * 10 + i),
    };
  })
);

async function run() {
  for (const p of products) {
    const slug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 96);

    const doc: SanityDoc = {
      _type: "product",
      title: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      availability: p.availability,
      slug: { _type: "slug", current: slug },
      imageUrl: p.imageUrl,
    };

    await client.createOrReplace<SanityDoc>({ _id: `product.${slug}`, ...doc });
    console.log(`Seeded: ${p.title}`);
  }
  console.log("Done. Open /studio to verify.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
