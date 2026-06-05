"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function WishlistRedirect() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Sign in to view wishlist</h1>
        <Link href="/login?callbackUrl=/account/wishlist">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (typeof window !== "undefined") {
    window.location.href = "/account/wishlist";
  }

  return null;
}
