import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-topbar-bg text-inverse-muted mt-auto border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <div className="relative w-20 h-20 mb-4 logo-glow rounded-full overflow-hidden ring-1 ring-gold/30">
                <Image
                  src={BRAND.logo}
                  alt={BRAND.logoAlt}
                  fill
                  className="object-cover scale-110"
                />
              </div>
              <p className="font-serif text-xl tracking-[0.12em] uppercase">
                <span className="gold-text font-semibold">Hasi</span>{" "}
                <span className="text-inverse-foreground">Fashion</span>
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mt-2">
                {BRAND.tagline}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-inverse-muted">
              Luxury fashion, home décor, and lifestyle — curated for those who appreciate the finer things.
            </p>
          </div>

          <div>
            <h4 className="text-inverse-foreground font-serif text-lg mb-5">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shop" className="hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link href="/collections" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="/lookbook" className="hover:text-gold transition-colors">Lookbook</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-inverse-foreground font-serif text-lg mb-5">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="hover:text-gold transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-inverse-foreground font-serif text-lg mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                Colombo, Sri Lanka
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                +94 77 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                hello@hasifashion.com
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider my-12" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-inverse-muted/70 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
