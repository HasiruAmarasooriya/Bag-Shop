"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-rose-900 to-rose-800">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Mail className="w-10 h-10 text-rose-200 mx-auto mb-4" />
        <h2 className="text-3xl font-serif font-bold text-white mb-3">
          Join the Hasi Family
        </h2>
        <p className="text-rose-200 mb-8">
          Subscribe for exclusive offers, new arrivals, and style inspiration.
        </p>

        {submitted ? (
          <p className="text-white text-lg font-medium">
            Thank you for subscribing! 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-rose-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button
              type="submit"
              className="bg-white text-rose-900 hover:bg-rose-50"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
