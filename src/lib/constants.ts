export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

/** Uploaded or static assets served from this app (safe for next/image). */
export function isLocalImage(src: string): boolean {
  return Boolean(src && src.startsWith("/") && !src.startsWith("//"));
}

/** Public display: only local uploads or placeholder — blocks legacy external URLs. */
export function getDisplayImageSrc(src: string | undefined): string {
  if (!src || !isLocalImage(src)) return PLACEHOLDER_IMAGE;
  return src;
}

export const UPLOAD_FOLDERS = [
  "products",
  "categories",
  "gallery",
  "banners",
] as const;

export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const CATEGORY_EMOJIS: Record<string, string> = {
  clothes: "👗",
  bags: "👜",
  shoes: "👠",
  "wall-decor": "🖼️",
  decoration: "✨",
  "artificial-flowers": "🌸",
  accessories: "💎",
  "home-living": "🏠",
};
