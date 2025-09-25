export type MockProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export function inferCategory(title: string): string {
  const t = title.toLowerCase();
  if (/(sneaker|shoe|trainer)/.test(t)) return "Footwear";
  if (/(watch)/.test(t)) return "Watches";
  if (/(sunglass|bag|leather|glasses)/.test(t)) return "Accessories";
  if (/(sweater|hoodie|knit|t-shirt|tee|shirt|jacket)/.test(t)) return "Clothing";
  return "Accessories";
}

export function getAllProducts(): MockProduct[] {
  const base = [
    { id: 1, title: "Luna Knit Sweater", price: 59.0, image: "https://picsum.photos/id/1025/600/400" },
    { id: 2, title: "Aurora Leather Bag", price: 129.99, image: "https://picsum.photos/id/1001/600/400" },
    { id: 3, title: "Solstice Sneakers", price: 89.5, image: "https://picsum.photos/id/1011/600/400" },
    { id: 4, title: "Halo Sunglasses", price: 39.99, image: "https://picsum.photos/id/1015/600/400" },
    { id: 5, title: "Comet Watch", price: 199.0, image: "https://picsum.photos/id/1020/600/400" },
    { id: 6, title: "Nimbus Hoodie", price: 74.25, image: "https://picsum.photos/id/1035/600/400" },
  ];
  return base.map((p) => ({ ...p, category: inferCategory(p.title) }));
}

export function getProductById(id: number): MockProduct | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getRelatedByCategory(category: string, excludeId: number, limit = 3): MockProduct[] {
  return getAllProducts().filter((p) => p.category === category && p.id !== excludeId).slice(0, limit);
}


