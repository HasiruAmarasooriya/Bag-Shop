"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { DashboardStats } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats?.totalProducts ?? "—",
      icon: Package,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? "—",
      icon: ShoppingCart,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? "—",
      icon: Users,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      label: "Revenue",
      value: stats ? formatPrice(stats.totalRevenue) : "—",
      icon: DollarSign,
      color: "bg-gold/15 text-accent",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="p-6 theme-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="theme-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-muted">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted">
                  Customer
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted">
                  Total
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.length ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-t border-border">
                    <td className="px-6 py-4 font-mono text-xs">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      {(order as { userId?: { name?: string } }).userId?.name ||
                        "—"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{order.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
