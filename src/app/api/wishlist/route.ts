import { NextRequest, NextResponse } from "next/server";
import {
  getWishlistProducts,
  toggleWishlist,
  getProductById,
  getUserById,
} from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await getWishlistProducts(session.user.id);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const user = await getUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const wishlist = await toggleWishlist(session.user.id, productId);
    return NextResponse.json({ wishlist });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
