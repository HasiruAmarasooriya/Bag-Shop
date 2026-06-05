import Image from "next/image";
import { Heart, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-rose-50 to-stone-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-6">
            About Hasi Fashion
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Born from a passion for elegant design and quality craftsmanship,
            Hasi Fashion brings you a curated collection of handbags and
            accessories that complement every moment of your life.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
            alt="Hasi Fashion"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Our Story
          </h2>
          <p className="text-stone-600 leading-relaxed">
            Founded in Colombo, Sri Lanka, Hasi Fashion started with a simple
            vision: to make premium fashion accessories accessible to every
            woman who values style and quality. Each piece in our collection is
            carefully selected to ensure it meets our standards of elegance,
            durability, and timeless appeal.
          </p>
          <p className="text-stone-600 leading-relaxed">
            From everyday totes to evening clutches, we believe the right bag
            doesn&apos;t just carry your essentials — it carries your confidence.
          </p>
        </div>
      </section>

      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: Heart, title: "Passion", desc: "Love for fashion in every stitch" },
            { icon: Award, title: "Quality", desc: "Premium materials and craftsmanship" },
            { icon: Users, title: "Community", desc: "500+ happy customers and growing" },
          ].map((item) => (
            <div key={item.title}>
              <item.icon className="w-10 h-10 text-rose-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-stone-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
