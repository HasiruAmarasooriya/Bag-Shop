import Image from "next/image";
import Link from "next/link";
import { buildCollectionsFromCategories } from "@/lib/gallery";
import { mergeCategoriesWithDb } from "@/lib/categories";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { getCategories } from "@/lib/db";
import { ArrowRight } from "lucide-react";

export default async function CollectionsPage() {
  let categories = mergeCategoriesWithDb([]);
  let collections = buildCollectionsFromCategories([]);

  try {
    const dbCategories = (await getCategories()) as {
      name: string;
      slug?: string;
      image?: string;
      description?: string;
    }[];
    categories = mergeCategoriesWithDb(dbCategories);
    collections = buildCollectionsFromCategories(dbCategories);
  } catch {
    // use static fallback
  }

  return (
    <div>
      <section className="luxury-gradient py-24 text-center">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Handpicked</p>
        <h1 className="text-5xl lg:text-6xl font-serif font-light text-white">
          Signature <span className="font-semibold gold-text">Collections</span>
        </h1>
        <p className="text-white/50 mt-4 max-w-lg mx-auto font-light">
          Curated edits spanning fashion, footwear, décor and beyond.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        {collections.map((col, i) => (
          <Link
            key={col.title}
            href={col.href}
            className={`group grid lg:grid-cols-2 gap-0 luxury-card overflow-hidden ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
          >
            <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image
                src={col.image || PLACEHOLDER_IMAGE}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className={`flex flex-col justify-center p-10 lg:p-16 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{col.subtitle}</p>
              <h2 className="text-4xl font-serif font-light text-foreground mb-4">{col.title}</h2>
              <p className="text-muted leading-relaxed mb-8">
                Explore our carefully selected pieces that embody the essence of {col.subtitle.toLowerCase()}.
              </p>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="section-alt py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-foreground mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 bg-surface border border-border hover:border-gold transition-all text-center luxury-card"
              >
                <span className="text-3xl block mb-3">{cat.emoji}</span>
                <p className="font-medium text-foreground text-sm group-hover:text-accent">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
