"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useMounted } from "@/hooks/useMounted";

export default function Newsletter() {
  const mounted = useMounted();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 luxury-gradient relative overflow-hidden">
      <div className="absolute inset-0 shimmer-gold opacity-30" />
      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Exclusive Access</p>
        <h2 className="text-4xl font-serif font-light text-white mb-4">
          Join the <span className="font-semibold gold-text">Hasi Circle</span>
        </h2>
        <p className="text-white/50 mb-10 font-light">
          Be the first to discover new collections, private sales, and style inspiration.
        </p>

        {submitted ? (
          <p className="text-gold text-lg font-serif">Welcome to the circle.</p>
        ) : mounted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              autoComplete="email"
              className="flex-1 px-5 py-3.5 bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-gold text-sm"
            />
            <Button type="submit" variant="luxury">Subscribe</Button>
          </form>
        ) : (
          <div className="h-12 max-w-md mx-auto" aria-hidden />
        )}
      </div>
    </section>
  );
}
