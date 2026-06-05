import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { PLACEHOLDER_IMAGE, isLocalImage } from "@/lib/constants";
import { getGalleryItems } from "@/lib/db";

const looks = [
  {
    title: "Evening Soirée",
    desc: "Silk dresses, statement heels, and a clutch to complete the night.",
    items: ["Clothes", "Shoes", "Bags"],
  },
  {
    title: "Botanical Living",
    desc: "Artificial blooms, wall art, and decorative accents for serene spaces.",
    items: ["Artificial Flowers", "Wall Decor", "Decoration"],
  },
  {
    title: "Urban Professional",
    desc: "Tailored pieces, structured bags, and accessories for the modern woman.",
    items: ["Clothes", "Bags", "Accessories"],
  },
  {
    title: "Weekend Retreat",
    desc: "Comfortable elegance with soft textures and natural tones.",
    items: ["Home & Living", "Decoration", "Clothes"],
  },
];

export default async function LookbookPage() {
  let galleryImages: string[] = [];
  try {
    const items = await getGalleryItems();
    galleryImages = items
      .map((item) => item.image)
      .filter((img): img is string => Boolean(img) && isLocalImage(img));
  } catch {
    // use placeholders
  }

  const getLookImage = (index: number) =>
    galleryImages[index] || PLACEHOLDER_IMAGE;

  return (
    <div>
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <Image
          src={galleryImages[0] || PLACEHOLDER_IMAGE}
          alt="Lookbook"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Style Inspiration</p>
          <h1 className="text-5xl lg:text-7xl font-serif font-light text-white">
            The <span className="font-semibold">Lookbook</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-md font-light text-lg">
            Styled moments to inspire your next luxury purchase.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {looks.map((look, i) => (
          <div
            key={look.title}
            className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "" : ""}`}
          >
            <div className={`relative aspect-[4/5] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image src={getLookImage(i + 1)} alt={look.title} fill className="object-cover" />
              <div className="absolute inset-0 border border-gold/20 translate-x-3 translate-y-3" />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Look {i + 1}</p>
              <h2 className="text-4xl font-serif font-light text-foreground mb-4">{look.title}</h2>
              <p className="text-muted leading-relaxed mb-6">{look.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {look.items.map((item) => (
                  <Link
                    key={item}
                    href={`/shop?category=${encodeURIComponent(item)}`}
                    className="px-4 py-1.5 text-xs uppercase tracking-widest border border-border text-muted hover:border-gold hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <Link href="/shop">
                <Button variant="outline" className="gap-2">
                  Shop This Look <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="luxury-gradient py-20 text-center">
        <h2 className="text-3xl font-serif text-white font-light mb-4">Create Your Own Look</h2>
        <p className="text-white/50 mb-8">Mix and match across all our categories.</p>
        <Link href="/shop">
          <Button variant="luxury" size="lg">Explore Shop</Button>
        </Link>
      </section>
    </div>
  );
}
