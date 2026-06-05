import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/lib/db";
import { formatPrice, getDiscount } from "@/lib/utils";
import { getDisplayImageSrc } from "@/lib/constants";
import AddToCartButton from "@/components/shop/AddToCartButton";
import type { Product as ProductType } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<ProductType | null> {
  try {
    const product = await getProductBySlug(slug);
    return product as ProductType | null;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const discount = getDiscount(product.price, product.comparePrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-muted luxury-card">
          <Image
            src={getDisplayImageSrc(product.images[0])}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-foreground text-background text-sm font-semibold px-3 py-1">
              -{discount}% OFF
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gold uppercase tracking-wider">
              {product.category}
            </p>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-accent">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xl text-muted line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          <p className="text-muted leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-muted">Colors: </span>
              <span className="text-foreground">{product.colors.join(", ")}</span>
            </div>
            <div>
              <span className="text-muted">Sizes: </span>
              <span className="text-foreground">{product.sizes.join(", ")}</span>
            </div>
          </div>

          <p className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 dark:text-green-400 font-medium">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </p>

          <AddToCartButton product={product} />

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-muted">
              <Truck className="w-5 h-5 text-gold" />
              Free delivery over LKR 15,000
            </div>
            <div className="flex items-center gap-3 text-sm text-muted">
              <Shield className="w-5 h-5 text-gold" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
