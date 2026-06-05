import Hero from "@/components/shop/Hero";
import CategoryStrip from "@/components/shop/CategoryStrip";
import CollectionsPreview from "@/components/shop/CollectionsPreview";
import BrandStory from "@/components/shop/BrandStory";
import ProductGrid from "@/components/shop/ProductGrid";
import Newsletter from "@/components/shop/Newsletter";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Gem } from "lucide-react";
import { getProducts } from "@/lib/db";
import type { Product as ProductType } from "@/types";

async function getFeaturedProducts(): Promise<ProductType[]> {
  try {
    const products = await getProducts({ featured: true, limitCount: 8 });
    products.sort((a, b) => b.rating - a.rating);
    return products as ProductType[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero />
      <CategoryStrip />

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Editor&apos;s Pick</p>
              <h2 className="text-4xl font-serif font-light text-foreground">
                Featured <span className="font-semibold">Pieces</span>
              </h2>
            </div>
            <Link href="/shop?featured=true" className="text-sm uppercase tracking-widest text-muted hover:text-foreground flex items-center gap-2 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} emptyMessage="Featured products coming soon." />
        </div>
      </section>

      <CollectionsPreview />
      <BrandStory />

      <section className="py-20 section-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Complimentary Delivery", desc: "On orders over LKR 15,000" },
              { icon: Shield, title: "Secure Checkout", desc: "Protected payment processing" },
              { icon: Gem, title: "Curated Quality", desc: "Hand-selected luxury pieces" },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-8 border border-border/50 hover:border-gold/40 transition-colors rounded-sm">
                <feature.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl text-inverse-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-inverse-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
