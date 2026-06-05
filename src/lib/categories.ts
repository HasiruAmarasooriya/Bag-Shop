import { PLACEHOLDER_IMAGE, CATEGORY_EMOJIS } from "@/lib/constants";

export interface CategoryItem {
  name: string;
  slug: string;
  description: string;
  image: string;
  emoji: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    name: "Clothes",
    slug: "clothes",
    description: "Elegant apparel for every occasion",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS.clothes,
  },
  {
    name: "Bags",
    slug: "bags",
    description: "Premium handbags and totes",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS.bags,
  },
  {
    name: "Shoes",
    slug: "shoes",
    description: "Luxury footwear collection",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS.shoes,
  },
  {
    name: "Wall Decor",
    slug: "wall-decor",
    description: "Statement wall art and frames",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS["wall-decor"],
  },
  {
    name: "Decoration",
    slug: "decoration",
    description: "Curated home decoration pieces",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS.decoration,
  },
  {
    name: "Artificial Flowers",
    slug: "artificial-flowers",
    description: "Everlasting floral arrangements",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS["artificial-flowers"],
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Jewelry, scarves and more",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS.accessories,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Luxury lifestyle essentials",
    image: PLACEHOLDER_IMAGE,
    emoji: CATEGORY_EMOJIS["home-living"],
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug || c.name === slug);
}

export function mergeCategoriesWithDb(
  dbCategories: { name: string; slug?: string; image?: string; description?: string }[]
): CategoryItem[] {
  return CATEGORIES.map((staticCat) => {
    const dbCat = dbCategories.find(
      (c) => c.name === staticCat.name || c.slug === staticCat.slug
    );
    return {
      ...staticCat,
      image: dbCat?.image || staticCat.image,
      description: dbCat?.description || staticCat.description,
    };
  });
}
