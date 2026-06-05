import { Suspense } from "react";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopFilters from "@/components/shop/ShopFilters";
import { getProducts as fetchProducts } from "@/lib/db";
import type { Product as ProductType } from "@/types";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    featured?: string;
    sort?: string;
  }>;
}

async function getProducts(params: {
  category?: string;
  search?: string;
  featured?: string;
  sort?: string;
}): Promise<ProductType[]> {
  try {
    const products = await fetchProducts({
      category: params.category,
      featured: params.featured === "true",
      search: params.search,
      sort: params.sort,
    });
    return products as ProductType[];
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const products = await getProducts(params);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-stone-900">
          {params.category || params.search
            ? params.category || `Results for "${params.search}"`
            : "Shop All"}
        </h1>
        <p className="text-stone-500 mt-2">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={<div className="lg:w-56" />}>
          <ShopFilters />
        </Suspense>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
