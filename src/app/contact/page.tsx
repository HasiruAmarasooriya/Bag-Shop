"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">
          Get in Touch
        </h1>
        <p className="text-stone-500">
          We&apos;d love to hear from you. Send us a message!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {[
            { icon: MapPin, title: "Address", value: "Colombo, Sri Lanka" },
            { icon: Phone, title: "Phone", value: "+94 77 123 4567" },
            { icon: Mail, title: "Email", value: "hello@hasifashion.com" },
            { icon: Clock, title: "Hours", value: "Mon - Sat: 9AM - 6PM" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-xl">
                <item.icon className="w-5 h-5 text-rose-900" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">{item.title}</h3>
                <p className="text-stone-500">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-white rounded-2xl border border-stone-100">
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-stone-900 mb-2">
                Message sent!
              </p>
              <p className="text-stone-500">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" required placeholder="Your name" />
              <Input
                label="Email"
                type="email"
                required
                placeholder="you@example.com"
              />
              <Input label="Subject" required placeholder="How can we help?" />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
