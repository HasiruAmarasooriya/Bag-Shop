"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice, getDiscount } from "@/lib/utils";
import { getDisplayImageSrc } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";
import { useMounted } from "@/hooks/useMounted";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mounted = useMounted();
  const addItem = useCartStore((s) => s.addItem);
  const discount = getDiscount(product.price, product.comparePrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images.find((img) => img.startsWith("/")) || "",
      quantity: 1,
      color: product.colors[0],
      size: product.sizes[0],
    });
  };

  return (
    <article className="group luxury-card overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
        <Link href={`/shop/${product.slug}`} className="block absolute inset-0 z-0">
          <Image
            src={getDisplayImageSrc(product.images[0])}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-foreground text-gold text-xs font-medium px-3 py-1 tracking-widest uppercase pointer-events-none">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 right-3 z-10 bg-gold text-charcoal text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase pointer-events-none">
            Featured
          </span>
        )}

        {mounted && (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-surface/95 backdrop-blur text-foreground py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <button
              type="button"
              className="p-2.5 bg-surface/95 backdrop-blur hover:bg-gold transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <Link href={`/shop/${product.slug}`} className="block p-5">
        <p className="text-[10px] text-gold uppercase tracking-[0.2em] mb-1.5">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span className="text-xs text-muted">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-muted line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>
      </Link>
    </article>
  );
}
