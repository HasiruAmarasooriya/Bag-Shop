import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildCollectionsFromCategories } from "@/lib/gallery";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { getCategories } from "@/lib/db";

export default async function CollectionsPreview() {
  let collections = buildCollectionsFromCategories([]);
  try {
    const categories = (await getCategories()) as {
      name: string;
      image?: string;
    }[];
    collections = buildCollectionsFromCategories(categories);
  } catch {
    // use placeholder fallback
  }

  return (
    <section className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Curated For You</p>
            <h2 className="text-4xl font-serif font-light text-foreground">
              Signature <span className="font-semibold">Collections</span>
            </h2>
          </div>
          <Link href="/collections" className="text-sm uppercase tracking-widest text-muted hover:text-foreground flex items-center gap-2 transition-colors">
            All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <Link key={col.title} href={col.href} className="group relative overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={col.image || PLACEHOLDER_IMAGE}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{col.subtitle}</p>
                  <h3 className="text-3xl font-serif text-white font-light">{col.title}</h3>
                  <span className="inline-flex items-center gap-2 text-white/80 text-xs uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Discover <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
