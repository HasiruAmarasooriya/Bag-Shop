import { NextRequest, NextResponse } from "next/server";
import {
  getOrders,
  createOrder,
  getProductById,
  decrementStock,
} from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getOrders(
      session.user.role === "admin" ? undefined : session.user.id
    );
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items, shippingAddress, paymentMethod } = body;

    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.name}` },
          { status: 400 }
        );
      }
    }

    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const order = await createOrder({
      userId: session.user.id,
      items,
      total,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
    });

    for (const item of items) {
      await decrementStock(item.productId, item.quantity);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order POST error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
