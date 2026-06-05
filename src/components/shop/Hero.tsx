import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-stone-50 to-amber-50" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur rounded-full text-sm text-rose-900 border border-rose-100">
            <Sparkles className="w-4 h-4" />
            New Collection 2026
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-stone-900 leading-[1.1]">
            Carry Your
            <span className="block text-rose-900">Elegance</span>
          </h1>

          <p className="text-lg text-stone-600 max-w-md leading-relaxed">
            Discover our curated collection of premium handbags and accessories.
            Where timeless design meets modern sophistication.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                Shop Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/shop?featured=true">
              <Button variant="outline" size="lg">
                Featured Items
              </Button>
            </Link>
          </div>

          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-serif font-bold text-rose-900">500+</p>
              <p className="text-sm text-stone-500">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-rose-900">50+</p>
              <p className="text-sm text-stone-500">Unique Designs</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-rose-900">4.8</p>
              <p className="text-sm text-stone-500">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-4 bg-rose-900/10 rounded-3xl rotate-6" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-900/20">
              <Image
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
                alt="Featured handbag"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
