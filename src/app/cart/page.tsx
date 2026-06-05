"use client";

import Image from "next/image";
import { getDisplayImageSrc } from "@/lib/constants";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
          Your cart is empty
        </h1>
        <p className="text-muted mb-8">
          Discover our beautiful collection and find your perfect piece.
        </p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-foreground mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex gap-4 p-4 theme-card"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-surface-muted shrink-0">
                <Image
                  src={getDisplayImageSrc(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {item.name}
                </h3>
                {(item.color || item.size) && (
                  <p className="text-sm text-muted mt-0.5">
                    {[item.color, item.size].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-accent font-semibold mt-1">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-border rounded-lg text-sm">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:text-accent transition-colors"
                    >
                      −
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:text-accent transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-semibold text-foreground shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 theme-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-foreground">{total >= 15000 ? "Free" : formatPrice(500)}</span>
              </div>
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
              <span className="text-foreground">Total</span>
              <span className="text-accent">
                {formatPrice(total >= 15000 ? total : total + 500)}
              </span>
            </div>
            <Link href="/checkout">
              <Button className="w-full gap-2" size="lg">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link
              href="/shop"
              className="block text-center text-sm text-muted hover:text-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
