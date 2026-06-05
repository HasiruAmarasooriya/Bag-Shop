import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { mergeCategoriesWithDb } from "@/lib/categories";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { getCategories } from "@/lib/db";

export default async function CategoryStrip() {
  let categories = mergeCategoriesWithDb([]);
  try {
    const dbCategories = (await getCategories()) as {
      name: string;
      slug?: string;
      image?: string;
      description?: string;
    }[];
    categories = mergeCategoriesWithDb(dbCategories);
  } catch {
    // use static fallback
  }

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Our Universe</p>
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-foreground">
            Shop by <span className="font-semibold">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative overflow-hidden aspect-[3/4] luxury-card"
            >
              <Image
                src={cat.image || PLACEHOLDER_IMAGE}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <span className="text-2xl mb-2 block">{cat.emoji}</span>
                <h3 className="text-white font-serif text-lg lg:text-xl font-medium">{cat.name}</h3>
                <p className="text-white/60 text-xs mt-1 hidden sm:block">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-gold text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
                  Shop <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground border-b border-gold pb-1 hover:text-accent transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
