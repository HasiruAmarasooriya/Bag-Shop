import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Handbags", slug: "Handbags", emoji: "👜" },
  { name: "Tote Bags", slug: "Tote Bags", emoji: "🛍️" },
  { name: "Crossbody", slug: "Crossbody", emoji: "✨" },
  { name: "Clutches", slug: "Clutches", emoji: "💎" },
  { name: "Backpacks", slug: "Backpacks", emoji: "🎒" },
];

export default function CategoryStrip() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-rose-900 flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group flex flex-col items-center p-6 bg-stone-50 rounded-2xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all duration-300"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span className="text-sm font-medium text-stone-700 group-hover:text-rose-900">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
