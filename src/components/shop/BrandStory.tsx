import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default function BrandStory() {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Hasi Fashion lifestyle"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold hidden lg:block" />
          </div>

          <div className="space-y-6">
            <p className="text-gold text-xs tracking-[0.4em] uppercase">The Hasi Story</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-foreground leading-tight">
              Where Fashion Meets
              <span className="block font-semibold">Timeless Living</span>
            </h2>
            <p className="text-muted leading-relaxed">
              From runway-inspired clothes to artisan home décor, Hasi Fashion is your
              destination for a life well-curated. Every piece tells a story of
              craftsmanship, beauty, and intentional living.
            </p>
            <p className="text-muted leading-relaxed">
              Whether you seek the perfect bag, a statement wall piece, or everlasting
              blooms — we bring luxury within reach.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg">Our Story</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
