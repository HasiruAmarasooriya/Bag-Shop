import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/lib/db";
import { formatPrice, getDiscount } from "@/lib/utils";
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
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-rose-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-rose-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
              -{discount}% OFF
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-stone-400 uppercase tracking-wider">
              {product.category}
            </p>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-stone-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-rose-900">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xl text-stone-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-stone-400">Colors: </span>
              <span className="text-stone-700">{product.colors.join(", ")}</span>
            </div>
            <div>
              <span className="text-stone-400">Sizes: </span>
              <span className="text-stone-700">{product.sizes.join(", ")}</span>
            </div>
          </div>

          <p className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </p>

          <AddToCartButton product={product} />

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <Truck className="w-5 h-5 text-rose-900" />
              Free delivery over LKR 15,000
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <Shield className="w-5 h-5 text-rose-900" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
