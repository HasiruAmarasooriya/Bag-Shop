"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
    paymentMethod: "COD",
  });

  const total = totalPrice();
  const shipping = total >= 15000 ? 0 : 500;
  const grandTotal = total + shipping;

  if (status === "loading") {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Sign in to checkout</h1>
        <p className="text-stone-500 mb-6">
          Please sign in or create an account to complete your order.
        </p>
        <Link href="/login?callbackUrl=/checkout">
          <Button size="lg">Sign In</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
            color: i.color,
            size: i.size,
          })),
          shippingAddress: form,
          paymentMethod: form.paymentMethod,
        }),
      });

      if (res.ok) {
        clearCart();
        router.push("/account/orders?success=true");
      } else {
        const data = await res.json();
        alert(data.error || "Order failed");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
            <h2 className="font-semibold text-lg">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                id="fullName"
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />
              <Input
                label="Phone"
                id="phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <Input
              label="Address"
              id="address"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="City"
                id="city"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <Input
                label="Postal Code"
                id="postalCode"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-100">
            <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
            <div className="space-y-2">
              {["COD", "Bank Transfer"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    form.paymentMethod === method
                      ? "border-rose-900 bg-rose-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={form.paymentMethod === method}
                    onChange={() =>
                      setForm({ ...form, paymentMethod: method })
                    }
                    className="text-rose-900"
                  />
                  <span className="font-medium">
                    {method === "COD" ? "Cash on Delivery" : method}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-28 p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
            <h2 className="font-semibold text-lg">Order Summary</h2>
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm"
              >
                <span className="text-stone-600">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-stone-100 pt-4">
              <span>Total</span>
              <span className="text-rose-900">{formatPrice(grandTotal)}</span>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
