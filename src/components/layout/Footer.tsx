import Link from "next/link";
import { Share2, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Hasi <span className="font-light text-rose-300">Fashion</span>
            </h3>
            <p className="text-sm leading-relaxed text-stone-400">
              Curating elegant handbags and accessories for the modern woman.
              Quality craftsmanship meets contemporary style.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-rose-300 transition-colors" aria-label="Social">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-rose-300 transition-colors" aria-label="Website">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-rose-300 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-rose-300 transition-colors">Shop All</Link></li>
              <li><Link href="/shop?featured=true" className="hover:text-rose-300 transition-colors">Featured</Link></li>
              <li><Link href="/about" className="hover:text-rose-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-rose-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=Handbags" className="hover:text-rose-300 transition-colors">Handbags</Link></li>
              <li><Link href="/shop?category=Tote+Bags" className="hover:text-rose-300 transition-colors">Tote Bags</Link></li>
              <li><Link href="/shop?category=Crossbody" className="hover:text-rose-300 transition-colors">Crossbody</Link></li>
              <li><Link href="/shop?category=Clutches" className="hover:text-rose-300 transition-colors">Clutches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                Colombo, Sri Lanka
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                +94 77 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                hello@hasifashion.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Hasi Fashion. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-rose-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-rose-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
