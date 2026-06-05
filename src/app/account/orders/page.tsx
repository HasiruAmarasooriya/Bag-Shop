"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

const statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  pending: "warning",
  processing: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
};

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-stone-500">Loading orders...</div>;
  }

  return (
    <>
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm mb-6">
          Order placed successfully! Thank you for shopping with Hasi Fashion.
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-stone-500 py-8">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 bg-white rounded-2xl border border-stone-100"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-stone-400">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-stone-500">
                    {new Date(order.createdAt).toLocaleDateString("en-LK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusVariant[order.status]}>
                    {order.status}
                  </Badge>
                  <span className="font-semibold text-rose-900">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-stone-400">
                        Qty: {item.quantity}
                        {item.color && ` · ${item.color}`}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">My Orders</h1>
      <Suspense fallback={<div className="text-stone-400">Loading...</div>}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}
