import { auth } from "@/lib/auth";
import Link from "next/link";
import { Package, Heart, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";

export default async function AccountDashboard() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">
          Hello, {session?.user?.name}!
        </h1>
        <p className="text-muted mt-1">
          Welcome to your Hasi Fashion account
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: Package,
            title: "My Orders",
            desc: "Track and view your orders",
            href: "/account/orders",
          },
          {
            icon: Heart,
            title: "Wishlist",
            desc: "Your saved favorites",
            href: "/account/wishlist",
          },
          {
            icon: ShoppingBag,
            title: "Shop",
            desc: "Browse new arrivals",
            href: "/shop",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 theme-card hover:border-gold/40 hover:shadow-md transition-all group"
          >
            <card.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-foreground">{card.title}</h3>
            <p className="text-sm text-muted mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-gold/10 to-accent/5 border border-gold/20 rounded-2xl">
        <h3 className="font-semibold text-foreground mb-2">
          Looking for something new?
        </h3>
        <p className="text-sm text-muted mb-4">
          Check out our latest featured collection.
        </p>
        <Link href="/shop?featured=true">
          <Button>Shop Featured</Button>
        </Link>
      </div>
    </div>
  );
}
