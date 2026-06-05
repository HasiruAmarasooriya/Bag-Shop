"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "All",
  "Handbags",
  "Tote Bags",
  "Crossbody",
  "Clutches",
  "Backpacks",
];

export default function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentSort = searchParams.get("sort") || "newest";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="lg:w-56 shrink-0">
      <div className="sticky top-28 space-y-6">
        <div>
          <h3 className="font-semibold text-stone-900 mb-3">Categories</h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    if (cat === "All") {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete("category");
                      router.push(`/shop?${params.toString()}`);
                    } else {
                      updateParam("category", cat);
                    }
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    (cat === "All" && !currentCategory) ||
                    currentCategory === cat
                      ? "bg-rose-50 text-rose-900 font-medium"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900 mb-3">Sort By</h3>
          <select
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm"
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
