"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/shop/ProductGrid";
import type { Product } from "@/types";

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-muted">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">My Wishlist</h1>
      <ProductGrid
        products={products}
        emptyMessage="Your wishlist is empty. Start adding your favorites!"
      />
    </div>
  );
}
