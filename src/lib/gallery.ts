import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  span?: "wide" | "tall" | "normal";
}

export const COLLECTIONS = [
  {
    title: "Spring Bloom",
    subtitle: "Artificial Flowers & Decor",
    image: PLACEHOLDER_IMAGE,
    href: "/shop?category=Artificial+Flowers",
  },
  {
    title: "Urban Luxe",
    subtitle: "Bags & Accessories",
    image: PLACEHOLDER_IMAGE,
    href: "/shop?category=Bags",
  },
  {
    title: "Evening Affair",
    subtitle: "Clothes & Shoes",
    image: PLACEHOLDER_IMAGE,
    href: "/shop?category=Clothes",
  },
  {
    title: "Home Sanctuary",
    subtitle: "Wall Decor & Living",
    image: PLACEHOLDER_IMAGE,
    href: "/shop?category=Wall+Decor",
  },
];

export function buildCollectionsFromCategories(
  categories: { name: string; image?: string }[]
) {
  const collectionDefs = [
    { title: "Spring Bloom", subtitle: "Artificial Flowers & Decor", category: "Artificial Flowers" },
    { title: "Urban Luxe", subtitle: "Bags & Accessories", category: "Bags" },
    { title: "Evening Affair", subtitle: "Clothes & Shoes", category: "Clothes" },
    { title: "Home Sanctuary", subtitle: "Wall Decor & Living", category: "Wall Decor" },
  ];

  return collectionDefs.map((col) => {
    const cat = categories.find((c) => c.name === col.category);
    return {
      title: col.title,
      subtitle: col.subtitle,
      image: cat?.image || PLACEHOLDER_IMAGE,
      href: `/shop?category=${encodeURIComponent(col.category)}`,
    };
  });
}
