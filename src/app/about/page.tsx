import Image from "next/image";
import { Heart, Award, Users } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-24 section-alt">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Our Heritage</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
            About Hasi Fashion
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Born from a passion for elegant design and quality craftsmanship,
            Hasi Fashion brings you a curated collection of luxury fashion,
            home décor, and lifestyle pieces that complement every moment of your life.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden luxury-card">
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Hasi Fashion"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-foreground">
            Our Story
          </h2>
          <p className="text-muted leading-relaxed">
            Founded in Colombo, Sri Lanka, Hasi Fashion started with a simple
            vision: to make premium fashion and lifestyle accessible to every
            person who values style and quality. Each piece in our collection is
            carefully selected to ensure it meets our standards of elegance,
            durability, and timeless appeal.
          </p>
          <p className="text-muted leading-relaxed">
            From runway-inspired clothes to artisan home décor — we believe the
            right piece doesn&apos;t just complete your look, it carries your confidence.
          </p>
        </div>
      </section>

      <section className="section-dark py-20">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: Heart, title: "Passion", desc: "Love for fashion in every stitch" },
            { icon: Award, title: "Quality", desc: "Premium materials and craftsmanship" },
            { icon: Users, title: "Community", desc: "500+ happy customers and growing" },
          ].map((item) => (
            <div key={item.title}>
              <item.icon className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-inverse-foreground">{item.title}</h3>
              <p className="text-inverse-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
