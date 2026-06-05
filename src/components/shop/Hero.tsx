import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden luxury-gradient">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="space-y-8 animate-slide-up">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
            {BRAND.tagline}
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-inverse-foreground leading-[1.05]">
            Curated
            <span className="block font-semibold gold-text">Elegance</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-light text-inverse-muted mt-2">
              For Every Moment
            </span>
          </h1>

          <div className="gold-divider w-48" />

          <p className="text-lg text-inverse-muted max-w-md leading-relaxed font-light">
            Discover exquisite clothes, bags, shoes, home décor, artificial flowers
            and lifestyle treasures — handpicked for the discerning soul.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/shop">
              <Button variant="luxury" size="lg" className="gap-3">
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="border-gold/40 text-inverse-foreground hover:bg-gold/10 hover:border-gold"
              >
                View Gallery
              </Button>
            </Link>
          </div>

          <div className="flex gap-10 pt-6 border-t border-gold/20">
            {[
              { value: "8+", label: "Categories" },
              { value: "500+", label: "Products" },
              { value: "4.9", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-serif text-gold">{stat.value}</p>
                <p className="text-xs text-inverse-muted tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px] logo-glow rounded-2xl overflow-hidden ring-1 ring-gold/25">
            <Image
              src={BRAND.logo}
              alt={BRAND.logoAlt}
              width={340}
              height={340}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="mt-6 font-serif text-lg tracking-[0.2em] uppercase text-center">
            <span className="gold-text font-semibold">Hasi</span>{" "}
            <span className="text-inverse-foreground">Fashion</span>
          </p>
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mt-2">
            {BRAND.tagline}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-10 w-full max-w-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden ring-1 ring-gold/20">
                <Image src={PLACEHOLDER_IMAGE} alt="" fill className="object-cover opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
