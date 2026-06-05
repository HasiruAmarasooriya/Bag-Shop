import Hero from "@/components/shop/Hero";
import CategoryStrip from "@/components/shop/CategoryStrip";
import ProductGrid from "@/components/shop/ProductGrid";
import Newsletter from "@/components/shop/Newsletter";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { getProducts } from "@/lib/db";
import type { Product as ProductType } from "@/types";

async function getFeaturedProducts(): Promise<ProductType[]> {
  try {
    const products = await getProducts({ featured: true, limitCount: 4 });
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900">
                Featured Collection
              </h2>
              <p className="text-stone-500 mt-1">Handpicked favorites just for you</p>
            </div>
            <Link
              href="/shop?featured=true"
              className="text-sm font-medium text-rose-900 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid
            products={featuredProducts}
            emptyMessage="Featured products coming soon. Run seed to populate."
          />
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On orders over LKR 15,000" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: RefreshCw, title: "Easy Returns", desc: "7-day return policy" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-stone-100"
              >
                <div className="p-3 bg-rose-50 rounded-xl">
                  <feature.icon className="w-6 h-6 text-rose-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">{feature.title}</h3>
                  <p className="text-sm text-stone-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
