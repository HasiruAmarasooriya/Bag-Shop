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
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? "—",
      icon: ShoppingCart,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? "—",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Revenue",
      value: stats ? formatPrice(stats.totalRevenue) : "—",
      icon: DollarSign,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="p-6 bg-white rounded-2xl border border-stone-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-stone-500">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-stone-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-stone-500">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 font-medium text-stone-500">
                  Customer
                </th>
                <th className="text-left px-6 py-3 font-medium text-stone-500">
                  Total
                </th>
                <th className="text-left px-6 py-3 font-medium text-stone-500">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-medium text-stone-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.length ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-t border-stone-50">
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
                    <td className="px-6 py-4 text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-stone-400">
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
