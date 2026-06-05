"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice, getDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = getDiscount(product.price, product.comparePrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      quantity: 1,
      color: product.colors[0],
      size: product.sizes[0],
    });
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-rose-900/5 transition-all duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-rose-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-white/95 backdrop-blur text-stone-900 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-900 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="p-2.5 bg-white/95 backdrop-blur rounded-xl hover:bg-rose-50 hover:text-rose-900 transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-medium text-stone-900 group-hover:text-rose-900 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-stone-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-rose-900">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
