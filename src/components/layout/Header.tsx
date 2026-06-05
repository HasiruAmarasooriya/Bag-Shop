"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Search,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

export default function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = useCartStore((s) => s.totalItems());

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl lg:text-3xl font-serif font-bold text-rose-900 tracking-tight">
              Hasi
            </span>
            <span className="text-2xl lg:text-3xl font-light text-stone-400 group-hover:text-rose-700 transition-colors">
              Fashion
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-rose-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-rose-900 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-600 hover:text-rose-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="p-2 text-stone-600 hover:text-rose-900 transition-colors hidden sm:block"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="p-2 text-stone-600 hover:text-rose-900 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-900 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="relative group hidden sm:block">
                <button className="p-2 text-stone-600 hover:text-rose-900 transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white rounded-xl shadow-lg border border-stone-100 py-2 min-w-[180px]">
                    <p className="px-4 py-2 text-sm text-stone-500 border-b border-stone-100">
                      {session.user.name}
                    </p>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      <User className="w-4 h-4" /> My Account
                    </Link>
                    {session.user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-rose-900 border border-rose-900 rounded-full hover:bg-rose-900 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 lg:hidden text-stone-600"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 animate-in fade-in slide-in-from-top-2">
            <form action="/shop" method="GET" className="relative">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bags, clutches, totes..."
                className="w-full px-4 py-3 pl-12 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            </form>
          </div>
        )}
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="px-4 py-4 space-y-2 border-t border-stone-100 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          {!session && (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-rose-900 font-medium"
            >
              Sign In
            </Link>
          )}
          {session && (
            <>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-stone-700"
              >
                My Account
              </Link>
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-stone-700"
                >
                  Admin Panel
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
