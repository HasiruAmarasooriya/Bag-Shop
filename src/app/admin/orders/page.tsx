"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Orders</h1>

      <div className="theme-card overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-muted">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="p-8 text-center text-muted">No orders yet</p>
        ) : (
          <div className="divide-y divide-border">
            {orders.map((order) => (
              <div key={order._id} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-sm">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-sm text-muted">
                      {(order as { userId?: { name?: string; email?: string } })
                        .userId?.name || "Customer"}{" "}
                      ·{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-accent">
                      {formatPrice(order.total)}
                    </span>
                    <Badge>{order.status}</Badge>
                  </div>
                </div>

                <div className="text-sm text-muted mb-4">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} × {item.quantity}
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={order.status === status ? "primary" : "outline"}
                      onClick={() => updateStatus(order._id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
