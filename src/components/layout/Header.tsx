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
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { CATEGORIES } from "@/lib/categories";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/gallery", label: "Gallery" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border">
      <div className="hidden lg:block bg-topbar-bg text-topbar-text text-xs tracking-[0.25em] uppercase text-center py-2.5">
        {BRAND.tagline} &nbsp;·&nbsp; Free delivery on orders over LKR 15,000
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl lg:text-3xl font-serif font-semibold tracking-wide leading-none">
              <span className="gold-text">{BRAND.shortName}</span>
              <span className="text-foreground"> Fashion</span>
            </span>
            <span className="text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-gold font-medium mt-0.5 hidden sm:block">
              {BRAND.tagline}
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) =>
              link.label === "Shop" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground transition-colors tracking-wide">
                    Shop <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {shopOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <div className="bg-surface border border-border shadow-2xl p-6 w-[520px] grid grid-cols-2 gap-2">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                            className="flex items-center gap-3 p-3 hover:bg-surface-muted transition-colors group"
                          >
                            <span className="text-xl">{cat.emoji}</span>
                            <div>
                              <p className="text-sm font-medium text-foreground group-hover:text-accent">
                                {cat.name}
                              </p>
                              <p className="text-xs text-muted line-clamp-1">
                                {cat.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-foreground transition-colors tracking-wide relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle className="hidden sm:block" />

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/wishlist" className="p-2 text-muted hover:text-foreground transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>

            <Link href="/cart" className="p-2 text-muted hover:text-foreground transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-charcoal text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="relative group hidden sm:block">
                <button className="p-2 text-muted hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-surface border border-border shadow-xl py-2 min-w-[200px]">
                    <p className="px-4 py-2 text-xs text-muted border-b border-border tracking-wide">
                      {session.user.name}
                    </p>
                    <Link href="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-surface-muted">
                      <User className="w-4 h-4" /> My Account
                    </Link>
                    {session.user.role === "admin" && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-surface-muted">
                        <LayoutDashboard className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 w-full">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-5 py-2 text-xs font-medium uppercase tracking-widest text-foreground border border-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Sign In
              </Link>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 xl:hidden text-muted">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 animate-in">
            <form action="/shop" method="GET" className="relative">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clothes, bags, decor, flowers..."
                className="w-full px-4 py-3 pl-12 border border-border bg-input-bg text-foreground placeholder:text-muted focus:outline-none focus:border-gold text-sm"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            </form>
          </div>
        )}
      </div>

      <div className={cn("xl:hidden overflow-hidden transition-all duration-300", mobileOpen ? "max-h-[85vh] overflow-y-auto" : "max-h-0")}>
        <nav className="px-4 py-4 space-y-1 border-t border-border bg-surface">
          <div className="flex items-center justify-between px-4 py-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-muted">Theme</span>
            <ThemeToggle />
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-foreground hover:bg-surface-muted text-sm tracking-wide">
              {link.label}
            </Link>
          ))}
          <p className="px-4 pt-3 pb-1 text-xs uppercase tracking-widest text-gold">Categories</p>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm text-muted hover:text-foreground"
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
          {!session && (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-accent font-medium text-sm mt-2">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
