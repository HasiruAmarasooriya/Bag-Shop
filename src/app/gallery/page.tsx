"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getDisplayImageSrc } from "@/lib/constants";
import { X, ArrowRight } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  span?: "wide" | "tall" | "normal";
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));
  }, []);

  const filtered =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);

  return (
    <div>
      <section className="luxury-gradient py-24 text-center">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Visual Journey</p>
        <h1 className="text-5xl lg:text-6xl font-serif font-light text-white">
          The <span className="font-semibold gold-text">Gallery</span>
        </h1>
        <p className="text-white/50 mt-4 max-w-lg mx-auto font-light">
          A curated showcase of luxury fashion, décor, and lifestyle inspiration.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {["All", ...CATEGORIES.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest transition-all ${
                filter === cat
                  ? "bg-foreground text-background"
                  : "bg-surface-muted text-muted hover:bg-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg font-serif">Gallery coming soon</p>
            <p className="text-sm text-muted mt-2">
              Images are added by the admin from the Gallery panel.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item) => (
              <button
                key={item._id}
                onClick={() => setLightbox(item)}
                className="block w-full break-inside-avoid group relative overflow-hidden luxury-card"
              >
                <div className={`relative ${item.span === "tall" ? "aspect-[3/5]" : item.span === "wide" ? "aspect-[16/10]" : "aspect-square"}`}>
                  <Image
                    src={getDisplayImageSrc(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-end p-5">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-left">
                      <p className="text-gold text-xs tracking-widest uppercase">{item.category}</p>
                      <p className="text-white font-serif text-lg">{item.title}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="text-center mt-16 p-12 section-alt">
          <h3 className="text-2xl font-serif text-foreground mb-3">Love what you see?</h3>
          <p className="text-muted mb-6">Explore our full collection and bring luxury home.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground border-b border-gold pb-1 hover:text-accent"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image src={getDisplayImageSrc(lightbox.image)} alt={lightbox.title} fill className="object-contain" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal to-transparent">
              <p className="text-gold text-xs tracking-widest uppercase">{lightbox.category}</p>
              <p className="text-white font-serif text-2xl">{lightbox.title}</p>
              <Link
                href={`/shop?category=${encodeURIComponent(lightbox.category)}`}
                className="inline-flex items-center gap-2 text-white/70 text-sm mt-3 hover:text-gold transition-colors"
              >
                Shop {lightbox.category} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
