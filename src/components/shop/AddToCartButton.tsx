"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.colors[0] || "");
  const [size, setSize] = useState(product.sizes[0] || "");

  const handleAdd = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      quantity,
      color,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock <= 0) {
    return (
      <Button disabled className="w-full sm:w-auto">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {product.colors.length > 0 && (
        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  color === c
                    ? "border-rose-900 bg-rose-50 text-rose-900"
                    : "border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  size === s
                    ? "border-rose-900 bg-rose-50 text-rose-900"
                    : "border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-stone-200 rounded-full">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-stone-600 hover:text-rose-900"
          >
            −
          </button>
          <span className="px-4 py-2 font-medium">{quantity}</span>
          <button
            onClick={() =>
              setQuantity(Math.min(product.stock, quantity + 1))
            }
            className="px-4 py-2 text-stone-600 hover:text-rose-900"
          >
            +
          </button>
        </div>

        <Button onClick={handleAdd} size="lg" className="gap-2 flex-1 sm:flex-none">
          {added ? (
            <>
              <Check className="w-4 h-4" /> Added!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
