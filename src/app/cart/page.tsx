"use client";

import Image from "next/image";
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
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-stone-500 mb-8">
          Discover our beautiful collection and find your perfect bag.
        </p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-stone-900 truncate">
                  {item.name}
                </h3>
                {(item.color || item.size) && (
                  <p className="text-sm text-stone-400 mt-0.5">
                    {[item.color, item.size].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-rose-900 font-semibold mt-1">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-stone-200 rounded-lg text-sm">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:text-rose-900"
                    >
                      −
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:text-rose-900"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-semibold text-stone-900 shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
            <h2 className="text-lg font-semibold text-stone-900">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span>{total >= 15000 ? "Free" : formatPrice(500)}</span>
              </div>
            </div>
            <div className="border-t border-stone-100 pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-rose-900">
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
              className="block text-center text-sm text-stone-500 hover:text-rose-900"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
