import { NextResponse } from "next/server";
import {
  countProducts,
  countOrders,
  countUsers,
  getTotalRevenue,
  getRecentOrders,
} from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalProducts, totalOrders, totalUsers, totalRevenue, recentOrders] =
      await Promise.all([
        countProducts(),
        countOrders(),
        countUsers("user"),
        getTotalRevenue(),
        getRecentOrders(5),
      ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
