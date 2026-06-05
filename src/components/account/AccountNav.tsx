"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account", label: "Dashboard", icon: User },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/profile", label: "Profile", icon: Settings },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const isActive =
          link.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              isActive
                ? "bg-rose-50 text-rose-900"
                : "text-stone-600 hover:bg-stone-50"
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
